import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Building2, Factory, MapPinned, Sprout, Warehouse } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { algeriaNaturalEarthMap } from '../../data/algeriaMap'
import { territoryMapLocations } from '../../data/home'
import { nurseries } from '../../data/nurseries'
import { organization } from '../../data/organization'
import { cn } from '../../utils/cn'

type TerritoryMapProps = {
  compact?: boolean
}

type MapLayer = (typeof territoryMapLocations)[number]['layer']
type TerritoryLocation = (typeof territoryMapLocations)[number]
type RegionalDirectionId = (typeof organization.regionalDirections)[number]['id']
type SelectionDetail = {
  labelKey: string
  value: string
}

const layerOrder: MapLayer[] = ['general', 'regional', 'unit', 'nursery', 'park']

const defaultLayerVisibility: Record<MapLayer, boolean> = {
  general: true,
  regional: true,
  unit: false,
  nursery: false,
  park: false,
}

const wilayaRegionById: Record<string, RegionalDirectionId> = {
  'ain-defla': 'chlef',
  alger: 'bouira',
  blida: 'medea',
  bouira: 'bouira',
  boumerdes: 'bouira',
  chlef: 'chlef',
  medea: 'medea',
  tipaza: 'medea',
  tissemsilt: 'chlef',
}

const focusViewBox = {
  x: 45.2,
  y: 0.75,
  width: 18.4,
  height: 8.95,
} as const

const focusLabelOffsets: Partial<
  Record<
    (typeof territoryMapLocations)[number]['id'],
    { x: number; y: number; anchor: 'start' | 'end' }
  >
> = {
  rouiba: { x: 0.5, y: -0.5, anchor: 'start' },
  bouira: { x: -0.55, y: 0.65, anchor: 'end' },
  chlef: { x: 0.55, y: -0.45, anchor: 'start' },
  medea: { x: 0.55, y: 0.7, anchor: 'start' },
}

const focusLabelWidths: Record<string, number> = {
  bouira: 1.55,
  chlef: 1.45,
  medea: 1.65,
  rouiba: 1.8,
}

const layerMeta: Record<MapLayer, { count: number; labelKey: string; icon: LucideIcon }> = {
  general: { count: 1, labelKey: 'home.territoryV2.layers.general', icon: Building2 },
  regional: {
    count: organization.regionalDirections.length,
    labelKey: 'home.territoryV2.layers.regional',
    icon: MapPinned,
  },
  unit: {
    count: organization.implementationUnits.length,
    labelKey: 'home.territoryV2.layers.unit',
    icon: Factory,
  },
  nursery: { count: nurseries.length, labelKey: 'home.territoryV2.layers.nursery', icon: Sprout },
  park: {
    count: organization.equipmentParks.length,
    labelKey: 'home.territoryV2.layers.park',
    icon: Warehouse,
  },
}

function projectPoint(
  lon: number,
  lat: number,
  bounds: typeof algeriaNaturalEarthMap.bounds,
  padding = { left: 0, top: 0, width: 100, height: 100 },
) {
  const rawX = ((lon - bounds.left) / (bounds.right - bounds.left)) * 100
  const rawY = ((bounds.top - lat) / (bounds.top - bounds.bottom)) * 100

  return {
    x: padding.left + (rawX * padding.width) / 100,
    y: padding.top + (rawY * padding.height) / 100,
  }
}

export function TerritoryMap({ compact = false }: TerritoryMapProps) {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const isArabic = i18n.language === 'ar'
  const [layerVisibility, setLayerVisibility] =
    useState<Record<MapLayer, boolean>>(defaultLayerVisibility)
  const [activeLocationId, setActiveLocationId] = useState('rouiba')
  const confirmedWilayas = organization.regionalDirections.flatMap((direction) => direction.wilayas)
  const generalLocation = territoryMapLocations.find((location) => location.layer === 'general')
  const majorLocations = territoryMapLocations.filter(
    (location) => location.layer === 'general' || location.layer === 'regional',
  )
  const regionalLocations = territoryMapLocations.filter(
    (location) => location.layer === 'regional',
  )
  const activeLocation =
    territoryMapLocations.find((location) => location.id === activeLocationId) ?? generalLocation
  const activeDirection = organization.regionalDirections.find(
    (direction) => direction.id === activeLocationId,
  )
  const activeLayer = activeLocation?.layer ?? 'general'
  const activeSelectionName = activeLocation ? t(activeLocation.labelKey) : 'Rouiba'
  const activeSelectionDetails = getActiveSelectionDetails()

  function getRegionalDirectionName(
    direction: (typeof organization.regionalDirections)[number],
    compactLabel = false,
  ) {
    if (isArabic) {
      return direction.nameAr
    }

    return compactLabel
      ? direction.nameFr.replace(/^Direction R.+gionale\s+/i, 'DR ')
      : direction.nameFr
  }

  function getUnitId(locationId: string) {
    return locationId.replace('unit-', '')
  }

  function getNurseryId(locationId: string) {
    return locationId.replace('nursery-', '')
  }

  function getPark(locationId: string) {
    const slug = locationId.replace('park-', '')

    return organization.equipmentParks.find(
      (park) => park.id === `${slug}-park` || park.id.startsWith(slug),
    )
  }

  function getDirectionForUnit(unitId: string) {
    return organization.regionalDirections.find((direction) =>
      direction.units.some((id) => id === unitId),
    )
  }

  function getDirectionForPark(regionalDirectionId: string | undefined) {
    return organization.regionalDirections.find((direction) => direction.id === regionalDirectionId)
  }

  function getActiveSelectionDetails(): SelectionDetail[] {
    if (!activeLocation) {
      return []
    }

    const fallback = t('home.territoryV2.selection.approximate')
    const type = t(`home.territoryV2.layerTypes.${activeLocation.layer}`)
    const role = t(`home.territoryV2.selectionRoles.${activeLocation.layer}`)
    let location = fallback
    let attachment = t('home.territoryV2.selection.notSpecified')

    if (activeLocation.layer === 'general') {
      location = organization.generalDirection.location
      attachment = t('home.territoryV2.selection.centralAttachment')
    }

    if (activeLocation.layer === 'regional' && activeDirection) {
      location = activeDirection.headquarters
      attachment = `${t('home.territoryV2.nodes.generalDirection')} - ${
        organization.generalDirection.location
      }`
    }

    if (activeLocation.layer === 'unit') {
      const unitId = getUnitId(activeLocation.id)
      const unit = organization.implementationUnits.find((item) => item.id === unitId)
      const direction = getDirectionForUnit(unitId)

      location = t(activeLocation.labelKey)
      attachment =
        unit && 'attachedTo' in unit
          ? `${t('home.territoryV2.nodes.generalDirection')} - ${
              organization.generalDirection.location
            }`
          : direction
            ? getRegionalDirectionName(direction)
            : attachment
    }

    if (activeLocation.layer === 'nursery') {
      const nursery = nurseries.find((item) => item.id === getNurseryId(activeLocation.id))

      location = nursery?.wilaya ?? fallback
      attachment = nursery?.regionalDirection ?? attachment
    }

    if (activeLocation.layer === 'park') {
      const park = getPark(activeLocation.id)
      const direction = getDirectionForPark(park?.regionalDirection)

      location = t(activeLocation.labelKey)
      attachment = direction ? getRegionalDirectionName(direction) : attachment
    }

    return [
      { labelKey: 'home.territoryV2.selection.type', value: type },
      { labelKey: 'home.territoryV2.selection.location', value: location },
      { labelKey: 'home.territoryV2.selection.attachment', value: attachment },
      { labelKey: 'home.territoryV2.selection.role', value: role },
    ]
  }

  function toggleLayer(layer: MapLayer) {
    const isNextVisible = !layerVisibility[layer]

    setLayerVisibility((current) => ({
      ...current,
      [layer]: isNextVisible,
    }))

    if (isNextVisible) {
      const firstLayerLocation = territoryMapLocations.find((location) => location.layer === layer)

      if (firstLayerLocation) {
        setActiveLocationId(firstLayerLocation.id)
      }
    } else if (activeLocation?.layer === layer) {
      setActiveLocationId('rouiba')
    }
  }

  function renderSvgMarker(node: TerritoryLocation, index: number) {
    if (!layerVisibility[node.layer]) {
      return null
    }

    const position = projectPoint(node.lon, node.lat, algeriaNaturalEarthMap.bounds)
    const isMajor = node.layer === 'general' || node.layer === 'regional'
    const labelOffset = focusLabelOffsets[node.id]
    const radius = node.layer === 'general' ? 0.34 : node.layer === 'regional' ? 0.24 : 0.12

    return (
      <motion.g
        key={node.id}
        className={cn(
          'territory-focus-marker',
          `territory-focus-marker-${node.layer}`,
          activeLocationId === node.id && 'territory-focus-marker-active',
        )}
        transform={`translate(${position.x} ${position.y})`}
        role="button"
        tabIndex={0}
        aria-label={t(node.labelKey)}
        onClick={() => setActiveLocationId(node.id)}
        onFocus={() => setActiveLocationId(node.id)}
        onMouseEnter={() => setActiveLocationId(node.id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setActiveLocationId(node.id)
          }
        }}
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.28, delay: 0.1 + index * 0.018 }}
      >
        <title>{t(node.labelKey)}</title>
        <circle className="territory-focus-marker-halo" r={radius + 0.26} />
        <circle className="territory-focus-marker-dot" r={radius} />
        {isMajor && labelOffset && (
          <g className="territory-focus-label-group">
            <rect
              className="territory-focus-label-frame"
              x={
                labelOffset.anchor === 'end'
                  ? labelOffset.x - (focusLabelWidths[node.id] ?? 1.6) + 0.12
                  : labelOffset.x - 0.12
              }
              y={labelOffset.y - 0.5}
              width={focusLabelWidths[node.id] ?? 1.6}
              height={0.66}
              rx={0.16}
            />
            <text
              className="territory-focus-label"
              x={labelOffset.x}
              y={labelOffset.y}
              textAnchor={labelOffset.anchor}
              direction={isArabic ? 'rtl' : 'ltr'}
            >
              {t(node.labelKey)}
            </text>
          </g>
        )}
      </motion.g>
    )
  }

  return (
    <div className={cn('territory-map', compact && 'territory-map-compact')}>
      <div className="absolute inset-0 rounded-[inherit] bg-[var(--map-gradient)]" />
      <div
        className="topographic-lines absolute inset-0 rounded-[inherit] opacity-35"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="section-eyebrow">{t('home.territoryV2.mapEyebrow')}</p>
          <h3 className="mt-2 text-xl font-black text-[var(--text-primary)]">
            {t('home.territoryV2.mapTitle')}
          </h3>
        </div>
        <span className="grid size-11 place-items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)]">
          <MapPinned className="size-5 text-[var(--brand-primary)]" aria-hidden="true" />
        </span>
      </div>

      <div className="territory-map-stage">
        <div className="territory-focus-card">
          <div className="territory-focus-card-header">
            <div>
              <p className="section-eyebrow">{t('home.territoryV2.focusEyebrow')}</p>
              <h4>{t('home.territoryV2.focusTitle')}</h4>
            </div>
            <span>{t('home.territoryV2.focusBadge')}</span>
          </div>

          <div className="territory-focus-canvas">
            <div className="absolute inset-0 opacity-75 [background-image:linear-gradient(var(--map-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--map-grid-line)_1px,transparent_1px)] [background-size:34px_34px]" />
            <svg
              className="territory-focus-svg"
              viewBox={`${focusViewBox.x} ${focusViewBox.y} ${focusViewBox.width} ${focusViewBox.height}`}
              fill="none"
              aria-label={t('home.territoryV2.mapAria')}
              role="img"
            >
              <path
                className="territory-focus-country-base"
                d={algeriaNaturalEarthMap.countryPath}
              />
              {algeriaNaturalEarthMap.confirmedWilayas.map((wilaya) => (
                <motion.path
                  key={wilaya.id}
                  className={cn(
                    'territory-focus-wilaya',
                    wilayaRegionById[wilaya.id] &&
                      `territory-focus-wilaya-${wilayaRegionById[wilaya.id]}`,
                  )}
                  d={wilaya.path}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                  transition={{ duration: 0.34 }}
                >
                  <title>{wilaya.name}</title>
                </motion.path>
              ))}

              {generalLocation &&
                layerVisibility.general &&
                layerVisibility.regional &&
                regionalLocations.map((node, index) => {
                  const start = projectPoint(
                    generalLocation.lon,
                    generalLocation.lat,
                    algeriaNaturalEarthMap.bounds,
                  )
                  const end = projectPoint(node.lon, node.lat, algeriaNaturalEarthMap.bounds)
                  const controlY = Math.min(start.y, end.y) - 0.95

                  return (
                    <motion.path
                      key={`${node.id}-connection`}
                      className="territory-focus-connection"
                      d={`M ${start.x} ${start.y} C ${(start.x + end.x) / 2} ${controlY}, ${
                        (start.x + end.x) / 2
                      } ${controlY}, ${end.x} ${end.y}`}
                      initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
                      animate={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.55, delay: 0.16 + index * 0.06 }}
                    />
                  )
                })}

              {territoryMapLocations.map((node, index) => renderSvgMarker(node, index))}
            </svg>
          </div>

          <div className="territory-focus-summary">
            <p className="section-eyebrow">{t('home.territoryV2.regionalSummaryTitle')}</p>
            <div className="territory-network-band">
              <button
                type="button"
                className={cn(
                  'territory-network-node',
                  activeLocationId === 'rouiba' && 'is-active',
                )}
                onClick={() => setActiveLocationId('rouiba')}
              >
                <Building2 className="size-4" aria-hidden="true" />
                <span>{t('home.territoryV2.nodes.generalDirection')}</span>
                <strong>Rouiba</strong>
              </button>
              <span className="territory-network-line" aria-hidden="true" />
              {organization.regionalDirections.map((direction) => (
                <button
                  key={direction.id}
                  type="button"
                  className={cn(
                    'territory-network-node',
                    `territory-network-node-${direction.id}`,
                    activeLocationId === direction.id && 'is-active',
                  )}
                  onClick={() => setActiveLocationId(direction.id)}
                >
                  <MapPinned className="size-4" aria-hidden="true" />
                  <span>
                    {isArabic
                      ? direction.nameAr
                      : direction.nameFr.replace('Direction Régionale ', 'DR ')}
                  </span>
                  <strong>{direction.headquarters}</strong>
                </button>
              ))}
            </div>

            <div className="territory-selection-card" aria-live="polite">
              <div className="territory-selection-card-header">
                <div>
                  <p className="section-eyebrow">{t('home.territoryV2.activePointTitle')}</p>
                  <strong>{activeSelectionName}</strong>
                </div>
                <span>{t(`home.territoryV2.layerTypes.${activeLayer}`)}</span>
              </div>
              <dl className="territory-selection-details">
                {activeSelectionDetails.map((detail) => (
                  <div key={detail.labelKey}>
                    <dt>{t(detail.labelKey)}</dt>
                    <dd>
                      <bdi dir="auto">{detail.value}</bdi>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="territory-context-column">
          <div className="territory-context-card">
            <div>
              <p className="section-eyebrow">{t('home.territoryV2.contextEyebrow')}</p>
              <h4>{t('home.territoryV2.contextTitle')}</h4>
            </div>
            <div className="territory-context-map">
              <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--map-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--map-grid-line)_1px,transparent_1px)] [background-size:26px_26px]" />
              <svg
                className="territory-context-svg"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
              >
                <path className="territory-algeria-shadow" d={algeriaNaturalEarthMap.countryPath} />
                <path className="territory-algeria-shape" d={algeriaNaturalEarthMap.countryPath} />
                {algeriaNaturalEarthMap.confirmedWilayas.map((wilaya) => (
                  <path key={wilaya.id} className="territory-wilaya-shape" d={wilaya.path} />
                ))}
                {majorLocations.map((node) => {
                  const position = projectPoint(node.lon, node.lat, algeriaNaturalEarthMap.bounds)

                  return (
                    <circle
                      key={node.id}
                      className={cn(
                        'territory-context-marker',
                        `territory-context-marker-${node.layer}`,
                      )}
                      cx={position.x}
                      cy={position.y}
                      r={node.layer === 'general' ? 1.05 : 0.78}
                    />
                  )
                })}
              </svg>
            </div>
            <p className="territory-map-source territory-map-source-compact">
              {t('home.territoryV2.sourceNote')}
              <span>{t('home.territoryV2.mapDataNote')}</span>
            </p>
          </div>

          <div className="territory-layer-card">
            <p className="section-eyebrow">{t('home.territoryV2.legendTitle')}</p>
            <div className="territory-layer-grid">
              {layerOrder.map((layer) => {
                const Icon = layerMeta[layer].icon

                return (
                  <button
                    key={layer}
                    type="button"
                    className={cn(
                      'territory-layer-chip',
                      'territory-layer-button',
                      `layer-chip-${layer}`,
                      layerVisibility[layer] && 'is-active',
                    )}
                    aria-pressed={layerVisibility[layer]}
                    aria-label={`${t(layerMeta[layer].labelKey)} - ${
                      layerVisibility[layer]
                        ? t('home.territoryV2.layerOn')
                        : t('home.territoryV2.layerOff')
                    }`}
                    onClick={() => toggleLayer(layer)}
                  >
                    <span className="territory-layer-main">
                      <Icon className="size-3.5" aria-hidden="true" />
                      <strong>{layerMeta[layer].count}</strong>
                      <span>{t(layerMeta[layer].labelKey)}</span>
                    </span>
                    <span className="territory-layer-switch" aria-hidden="true">
                      <span />
                    </span>
                    <span className="territory-layer-state-text">
                      {layerVisibility[layer]
                        ? t('home.territoryV2.layerHideAction')
                        : t('home.territoryV2.layerShowAction')}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="territory-map-aside">
          <div className="territory-coverage-panel territory-confirmed-panel">
            <div className="territory-panel-heading">
              <p className="section-eyebrow">{t('home.territoryV2.confirmedTerritoryTitle')}</p>
              <strong>{t('home.territoryV2.coverageTitle')}</strong>
            </div>

            <div className="territory-region-legend">
              <p>{t('home.territoryV2.zonesLegendTitle')}</p>
              <div>
                {organization.regionalDirections.map((direction) => (
                  <span key={direction.id} className="territory-region-legend-item">
                    <i className={`territory-zone-swatch territory-zone-swatch-${direction.id}`} />
                    <bdi dir="auto">{getRegionalDirectionName(direction, true)}</bdi>
                  </span>
                ))}
              </div>
            </div>

            <div className="territory-wilaya-chip-list">
              {confirmedWilayas.map((wilaya) => (
                <span className="territory-wilaya-chip" key={wilaya}>
                  {wilaya}
                </span>
              ))}
            </div>

            <div className="territory-unit-list territory-unit-list-compact">
              <p className="text-xs font-black uppercase text-[var(--brand-primary)]">
                {t('home.territoryV2.unitsListTitle')}
              </p>
              <div>
                {organization.implementationUnits.map((unit) => (
                  <span className="territory-unit-badge" key={unit.id}>
                    <Factory className="size-3.5" aria-hidden="true" />
                    {t(`home.territoryV2.unitsList.${unit.id}`)}
                  </span>
                ))}
              </div>
            </div>

            <div className="territory-general-card territory-general-card-inline">
              <Building2 className="size-4" aria-hidden="true" />
              <div>
                <strong>
                  {isArabic
                    ? organization.generalDirection.nameAr
                    : organization.generalDirection.nameFr}
                </strong>
                <span>{organization.generalDirection.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
