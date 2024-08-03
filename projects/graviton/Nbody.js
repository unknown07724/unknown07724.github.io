const g = 39.5;
const dt = 0.008; // 0.008 years is equal to 2.92 days
const softeningConstant = 0.15;

const masses = [{
    name: "Sun", // We use solar masses as the unit of mass, so the mass of the Sun is exactly 1
    m: 1,
    x: -1.50324727873647e-6,
    y: -3.93762725944737e-6,
    z: -4.86567877183925e-8,
    vx: 3.1669325898331e-5,
    vy: -6.85489559263319e-6,
    vz: -7.90076642683254e-7
  }
  // Mercury, Venus, Earth and Mars data can be found in the pen for this tutorial
];

const innerSolarSystem = new nBodyProblem({
  g,
  dt,
  masses: JSON.parse(JSON.stringify(masses)), 
  softeningConstant
});
