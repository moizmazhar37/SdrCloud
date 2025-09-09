import React, { useState } from "react";
import { Map as PigeonMap } from "pigeon-maps";
import styles from "./Map.module.scss";

const Map = ({ locations = [] }) => {
  const [mapType, setMapType] = useState("map");
  const defaultCenter = [39.8283, -98.5795];
  const defaultZoom = 4;

  const CustomMarker = ({ left, top, visits }) => {
    const size = 40;
    return (
      <div
        className={styles.markerContainer}
        style={{
          position: "absolute",
          left: left - size / 2,
          top: top - size / 2,
          width: size,
          height: size,
        }}
      >
        <div className={styles.markerRipple}></div>
        <div className={styles.markerDot}>
          <span>{visits}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Recent Visits</h1>
        <div className={styles.mapControls}>
          <button
            className={mapType === "map" ? styles.active : ""}
            onClick={() => setMapType("map")}
          >
            Map
          </button>
          <button
            className={mapType === "satellite" ? styles.active : ""}
            onClick={() => setMapType("satellite")}
          >
            Satellite
          </button>
        </div>
      </div>

      <div className={styles.mapWrapper}>
        <PigeonMap
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          animate={true}
          minZoom={2}
          maxZoom={18}
          attribution={false}
          metaWheelZoom={true}
          twoFingerDrag={false}
          wheelZoom={true}
        >
          {locations.map((location, index) => (
            <CustomMarker
              key={index}
              anchor={[location.lat, location.lng]}
              visits={location.visits}
            />
          ))}
        </PigeonMap>
      </div>

      <button className={styles.fullscreenButton} aria-label="Fullscreen">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
        </svg>
      </button>

      <div className={styles.attribution}>
        Map data © OpenStreetMap contributors
      </div>
    </div>
  );
};

export default Map;
