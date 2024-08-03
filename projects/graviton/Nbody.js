const updateAccelerationVectors = (masses, g, softeningConstant) => {
  const massesLen = masses.length;

  for (let i = 0; i < massesLen; i++) {
    let ax = 0;
    let ay = 0;
    let az = 0;

    const massI = masses[i];

    for (let j = 0; j < massesLen; j++) {
      if (i !== j) {
        const massJ = masses[j];

        const dx = massJ.x - massI.x;
        const dy = massJ.y - massI.y;
        const dz = massJ.z - massI.z;

        const distSq = dx * dx + dy * dy + dz * dz;

        f = (g * massJ.m) / (distSq * Math.sqrt(distSq + softeningConstant));

        ax += dx * f;
        ay += dy * f;
        az += dz * f;
      }
    }

    massI.ax = ax;
    massI.ay = ay;
    massI.az = az;
  }
};
