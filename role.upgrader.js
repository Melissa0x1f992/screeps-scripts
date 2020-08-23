var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.memory.targetSource = -1;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
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

module.exports = roleUpgrader;