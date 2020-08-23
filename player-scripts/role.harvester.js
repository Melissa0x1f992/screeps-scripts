var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.refilling && creep.carry.energy == 0) {
            creep.memory.refilling = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.refilling && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.refilling = true;
	        creep.memory.targetSource = -1;
	        creep.say('⛽ refill');
	    }

	    if(creep.memory.refilling) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity)  ||
                                structure.structureType == STRUCTURE_CONTAINER &&
                                structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
            });
	        
            if(targets.length) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
	        if(creep.memory.targetSource == -1 ) {
	            creep.memory.targetSource = Math.floor(Math.min(Math.random()+0.3, 0.99999)*sources.length);
	        }
	        var target = creep.memory.targetSource;
            if(creep.harvest(sources[target]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[target], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleHarvester;