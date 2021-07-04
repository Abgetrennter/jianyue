
let roleBuilder = {

  /** @param {Creep} creep **/
  run : function(creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
    }

    if (creep.memory.building) {
      let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle : {stroke : '#ffffff'}});
        }
      }
    } else {
      let sources = creep.room.find(FIND_STRUCTURES, {
        filter : (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER &&
                  structure.store[RESOURCE_ENERGY] > 0);
        }
      });
      if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle : {stroke : '#ffaa00'}});
      }
    }
  }
};

module.exports = roleBuilder;