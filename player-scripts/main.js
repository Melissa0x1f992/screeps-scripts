var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    
    var spawn1 = Game.spawns['Spawn1'];
    var availableEnergy = spawn1.energy + spawn1.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_EXTENSION}).reduce((a, b) => a + b.energy, 0);
    if(availableEnergy >= 300) {
        var spawnTime = Game.time;
        
            var notFullStructures = spawn1.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity)  ||
                                structure.structureType == STRUCTURE_CONTAINER &&
                                structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
            });
        if (availableEnergy >= 300
           && notFullStructures.length > 0) {
            var numHarvesters = _.filter(Game.creeps, (c) => c.memory.role == 'harvester').length;
            if(numHarvesters < 1) {
                var creepName = 'HAR' + Math.random();
                console.log('Built ' + creepName);
                spawn1.spawnCreep([MOVE, MOVE, CARRY, CARRY, WORK], creepName, {memory: {role: 'harvester', targetSource: -1, spawn: spawnTime}});
                availableEnergy -= 300;
            }
               
           }
        
        if (availableEnergy >= 550
           && notFullStructures.length > 0) {
            var numHarvesters = _.filter(Game.creeps, (c) => c.memory.role == 'harvester').length;
            if(numHarvesters < 3) {
                var creepName = 'HAR' + Math.random();
                console.log('Built ' + creepName);
                spawn1.spawnCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, WORK], creepName, {memory: {role: 'harvester', targetSource: -1, spawn: spawnTime}});
                availableEnergy -= 550;
            }
               
           }
        
        if(availableEnergy >= 450
           && spawn1.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            var numBuilders = _.filter(Game.creeps, (c) => c.memory.role == 'builder').length;
            if(numBuilders < 3) {
                var creepName = 'BUI' + Math.random();
                console.log('Built ' + creepName);
                spawn1.spawnCreep([MOVE, MOVE, WORK, WORK, CARRY, WORK], creepName, {memory: {role: 'builder', targetSource: -1, spawn: spawnTime}});
                availableEnergy -= 450;
            }
        }
        
        if(availableEnergy >= 550) {
            var numUpgraders = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader').length;
            if(numUpgraders < 5) {
                var creepName = 'UPG' + Math.random();
                console.log('Built ' + creepName);
                spawn1.spawnCreep([MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY], creepName, {memory: {role: 'upgrader', targetSource: -1, spawn: spawnTime}});
                availableEnergy -= 850;
            } 
        }
        
        if (availableEnergy >= 450) {
            var numRepairers = _.filter(Game.creeps, (c) => c.memory.role == 'repairer').length;
            if(numRepairers < 3) {
                var creepName = 'REP' + Math.random();
                console.log('Built ' + creepName);
                spawn1.spawnCreep([MOVE, MOVE, WORK, CARRY, CARRY, CARRY, WORK], creepName, {memory: {role: 'repairer', targetSource: -1, spawn: spawnTime}});
                availableEnergy -= 450;
            }
        }
    }
    /*
    var tower = Game.getObjectById('fc70372bb0bee9ff5d6155b4');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    */

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}