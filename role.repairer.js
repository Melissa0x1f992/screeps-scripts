/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.memory.targetSource = -1;
            creep.memory.repairTarget = -1;
	        creep.say('🔧 repair');
	    }

	    if(creep.memory.repairing) {
	        var repairables = creep.room.find(FIND_STRUCTURES).filter(structure => {
	            return structure.hits < structure.hitsMax;
	        });
	        
            var target = creep.memory.repairTarget;
            var targetStructure = Game.getObjectById(target);
            //console.log(targetStructure);
            //
	        if(targetStructure == null || (target === -1 || targetStructure.hits === targetStructure.hitsMax)) {
	            var lowest = Number.POSITIVE_INFINITY;
                var tmp;
                for (var i=repairables.length-1; i>=0; i--) {
                    tmp = repairables[i].hits;
                    if (tmp < lowest) {
                        lowest = tmp;
                        target = repairables[i].id;
                    }
                }
	            creep.memory.repairTarget = target;
	        }
	        //*/
	        
            if(repairables.length) {
                targetStructure = Game.getObjectById(target);
                if(creep.repair(targetStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetStructure, {visualizePathStyle: {stroke: '#ffffff'}});
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

module.exports = roleRepairer;