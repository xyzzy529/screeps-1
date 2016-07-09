/**
 * @fileOverview Screeps module. Declaration of policies.
 * harvest policy.
 * @author Piers Shepperson
 */
"use strict";
var policy = require("policy");
var gc = require("gc");
//raceClaimer = require("raceClaimer");

/**
 * Declaration of policies that can be created.
 * @module policyFrameworks
 */
var policyFrameworks = {
    Type: {
        THE_POOL: "the.pool",
        PEACE: "peace",
        CONSTRUCTION: "construction",
        DEFEND: "defence",
        RESCUE: "rescue",
        FOREIGN_HARVEST: "foreign.harvest",
        FOREIGN_ROAD: "neutral.road",
        NEUTRAL_ROOM: "neutral.room",
        CLAIM: "claim",
        BUILD_SPAWN: "buildspawn",
        GIFT_WORKERS: "gift.workers",
        POLICY_MANY2ONE_LINKERS: gc.POLICY_MANY2ONE_LINKERS
    },


    /**
     * Creates  and activates a policy to organise a link setup in a room between harvested or mined resouces and a storage object.
     * @function createMany2OneLinkersPolicy
     * @param   {number} roomName  The name of the room for which we are setting up links
     * @param   {Object} fromLinks  An array of objects containing information on each link.
     *          Each element of the array is of the from:
     *          { fromId : number, resource : number, x : number, y : number, fromLinkId : number }
     *   <ul>
     *   <li> fromId = Target id of the supply object, typically a source or mineral.
     *   <li> resource = A RESOURCE_* value: the resource being transported, e.g RESOURCE_ENERGY for a source.
     *   <li> x = The x coordinate to position the creep. Needs to touch both the from object and link.
     *   <li> y = The x coordinate to position the creep. Needs to touch both the from object and link.
     *   <li> fromLinkId = The id of the link object. This will send materials to the to link.
     *   </ul>
     * @param   {Object} toLink The cost of the creep. Takes the from
     *          { toLinkId : number, x : number, y : number, storageId : number, mineId : number, mineResource, nunber }
     *   <ul>
     *   <li> toLinkID = Id of the link object, resource from the from links will be transferred to here.
     *   <li> x = The x coordinate to position the creep. Needs to touch both the from storage and link.
     *   <li> y = The x coordinate to position the creep. Needs to touch both the from storage and link.
     *   <li> storage = The id of the storage object.
     *   </ul>
     * @param {number} mineId If the creep is next to a surce or mineral it can also harvest of mine.
     *          Set to undefined if not required.
     * @param {number} mineResource RESOURCE_* value: the resource optionally being mined. Set to undefined if mineId is undefined.
     * @returns {Object}  Copy of the policy created.
     * @example
     *   // Links two sources to a storage object next to a mine.
     *   var fromLink1 = { fromId : 55db3176efa8e3fe66e04a50, resource : RESOURCE_ENERGY
     *                  , x : 13, y : 16, fromLinkId : 577dfc4a028278ee71b2c875 }
     *   var fromLink2 = { fromId : 55db3176efa8e3fe66e04a52, resource : RESOURCE_ENERGY
     *                  , x : 8, y : 35, fromLinkId : 57711380ad3cbdff451970ec }
     *   var toLink = { "W26S21", toLinkId : 577ec1375a1c85636f551c4b, x : 42, y : 28, storageId : 577a8dd4b973e61c594592dc
     *                  , mineId : 56e14bf41f7d4167346e0a76, mineResource, RESOURCE_OXYGEN }
     *   createMany2OneLinkersPolicy([fromLink1,fromLink2],toLink)
     */
    createMany2OneLinkersPolicy: function(roomName, fromLinks ,toLink)
    {
        var newPolicy = {id : policy.getNextPolicyId()
            ,type : this.Type.POLICY_MANY2ONE_LINKERS
            ,room : roomName
            ,fromLinks: fromLinks
            ,toLink: toLink
            ,linkCreeps : undefined
        }
        if (start) {
            var module = policy.getModuleFromPolicy(newPolicy);
            module.initilisePolicy(newPolicy)
            policy.activatePolicy(newPolicy);
        }
        return newPolicy;
    },


    createNeutralBuilderPolicy: function(startRoom
        , workRoom
        , sourceRoom
        , endRoom
        , workersContracted
        , start) {
        var newPolicy = { id : policy.getNextPolicyId(),
            type : this.Type.FOREIGN_ROAD,
            startRoom : startRoom,
            workRoom : workRoom,
            sourceRoom : sourceRoom,
            endRoom : endRoom,
            workersContractedFor : workersContracted,
            workersAssigned : 0,
            shuttingDown : false};
        if (start) {
            var module = policy.getModuleFromPolicy(newPolicy);
            module.initilisePolicy(newPolicy)
            if (0 < policy.activatePolicy(newPolicy)) {
            } else {
            }
        }
        return newPolicy;
    },

    createClaimPolicy: function(startRoom, controllerId, endRoom, start) {
        var newPolicy = { id : policy.getNextPolicyId(),
            type : this.Type.CLAIM,
            startRoom : startRoom,
            controllerId : controllerId,
            endRoom : endRoom,
            workersContractedFor : 0,
            workersAssigned : 0,
            shuttingDown : false};
        if (start) {
            var module = policy.getModuleFromPolicy(newPolicy);
            module.initilisePolicy(newPolicy)
            if (0 < policy.activatePolicy(newPolicy)) {
            } else {
            }
        }
        return newPolicy;
    },

    createGiftWorkersPolicy: function(startRoom, endRoom, numberGifted, start) {
        var newPolicy = { id : policy.getNextPolicyId(),
            type : this.Type.GIFT_WORKERS,
            startRoom : startRoom,
            endRoom : endRoom,
            workersContractedFor : numberGifted,
            workersAssigned : 0,
            workersDelivered : 0};
        if (start) {
            var module = policy.getModuleFromPolicy(newPolicy);
            module.initilisePolicy(newPolicy)
            if (0 < policy.activatePolicy(newPolicy)) {
            } else {
            }
        }
        return newPolicy;
    },

    createRescuePolicy: function(room)
    {
        var p = { id : policy.getNextPolicyId(),
            type : this.Type.RESCUE,
            room : room};
        return p;
    },

    createNeutralRoomPolicy: function(room)
    {
        var p = { id : policy.getNextPolicyId(),
            type : this.Type.NEUTRAL_ROOM,
            room : room};
        return p;
    },

    createBuildspawn: function(room)
    {
        var p = { id : policy.getNextPolicyId(),
            type : this.Type.BUILD_SPAWN,
            room : room};
        return p;
    },


    createPeacePolicy: function(room)
    {
        var p = { id : policy.getNextPolicyId(),
            type : this.Type.PEACE,
            room : room};
        return p;
    },

    createDefendPolicy: function(room)
    {
        var p = { id : policy.getNextPolicyId(),
            type : this.Type.DEFEND,
            room : room};
        return p;
    },

    createConstructionPolicy: function(room) {
        var p = {
            id : policy.getNextPolicyId(),
            type : this.Type.CONSTRUCTION,
            room : room
        };
        return p;
    },

    createThePool: function() {
        var p  = {
            id : 0,
            type : this.Type.THE_POOL,
            requisitions : {},
            supplyCentres : {},
            nextRequisitionsId : 0,
            nextSupplyCentreId : 0
        }
        return p;
    }
    
}



module.exports = policyFrameworks;

















































