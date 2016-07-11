/**
 * Created by Piers on 05/07/2016.
 */
"use strict";
/**
 * @fileOverview Screeps module. Task base object.
 * @author Piers Shepperson
 */
var gc = require("gc");
var TaskActions = require("task.actions")
/**
 * Task base object.
 * @module tasks
 */
var tasks = {
    
    Type: {
        HARVEST: gc.TASK_HARVEST,
        MOVE_FIND: gc.TASK_MOVE_FIND,
        OFFLOAD: gc.TASK_OFFLOAD,
        MOVE_POS: gc.TASK_MOVE_POS
    },

    Result: {
        Finished: gc.RESULT_FINISHED,
        Unfinished: gc.RESULT_UNFINISHED,
        Failed: gc.RESULT_FAILED,
        Rollback: gc.RESULT_ROLLBACK,
        Reset: gc.RESULT_RESET
    },
    
    MAX_TASK_ACTIONS: 5,
    
    
    doTasks: function(creep) {
        var taskList = creep.memory.tasks.tasklist;
        result = this.Result.Finished;
        var doneActions = new TaskActions(gc.CREEP);
        var actionCount = 0;
        while ((result == this.Result.Finished || result == this.Result.Failed //|| result == this.Result.Rollback
                    || result == this.Result.Rollback)
                            && taskList.length > 0 && actionCount++ < this.MAX_TASK_ACTIONS) {
            var task = taskList[0];
            var moduleName = "task." + task.taskType;
            var taskModule = require(moduleName);
            if (task.pickup) {
                this.pickUpLooseEnergy(creep);
                doneActions.actions.add(gc.PICKUP);
            }
            console.log(creep ,"about to do task", task.taskType,"Length of task list is", taskList.length);
           // creep.say(task.taskType);
            var result;
            if (!TaskActions.prototype.isConflict(doneActions, task.conflicts)) {

                result = taskModule.prototype.doTask(creep, task, doneActions);

            //    console.log(creep, "done", task.taskType,"Task, return", result);
                if (this.Result.Finished == result) {
                    doneActions.actions.add(task.conflicts);
                }
            } else {
          //      console.log(creep,"conflict found",task.conflicts);
                result = this.Result.Unfinished;
            }
            if (this.Result.RESULT_RESET == result) {
                taskList = creep.memory.tasks.tasklist;
            }

            if (this.Result.Rollback == result && task.loop) {
                if (2 <= taskList.length) {
                    var topTask = taskList.pop();
                    topTask.lastTask = task;
             //       console.log(creep,"rollback after",task.taskType,"got",topTask.taskType);
                    taskList.unshift(topTask);
                } else {
           //         console.log(creep,"trying to rollback on too short tasklist");
                }
            }  else  {
             //   console.log(creep,"check finresult", result,"this.Result.Finished"
             //       ,this.Result.Finished,"this.Result.Finished" ,this.Result.Failed);
                if (result == this.Result.Finished
                    || result == this.Result.Reset) {
                   // console.log(creep,"In finsihed or failed");
                    if (taskList.length > 0){
                        var doneTask = taskList.shift();
                        if (task.loop) {
                        //    console.log(creep,"pusshing task",doneTask,taskList)
                            taskList.push(doneTask);
                        }
                    }
                }
            }
        //    console.log("end while result", result, "tasklist length", taskList.length
        //        , "actionCount", actionCount);
          //  return;
        } //while

        if (result == this.Result.Unfinished) {

        } else if (0 == taskList.length) {
            this.emptyTaskList(creep);
        }
       // console.log(creep,"finsihed doTasks tasks left", taskList.length);
    },
    
    showTasks: function (creep) {
        var taskList = creep.memory.tasks.tasklist;
        for ( var i in taskList)  {
            console.log(creep,"task",i,"is", JSON.stringify(taskList[i]));
        }
    },


    pickUpLooseEnergy: function(creep){
        var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
        if(target) {
      //      console.log(creep,"about to pick up loose energy");
            creep.pickup(target)
        }
    },
    
    unshiftTask: function (creep,task) {
        creep.memory.tasks.tasklist.unshift(task);
    },

    getTargetId: function (creep) {
        return creep.memory.tasks.targetId;
    },
    
    setTargetId: function (creep, targetId) {
        creep.memory.tasks.targetId = targetId;
    },
/*
    setHomeLinkId: function (creep, homeLinkId) {
        creep.memory.tasks.homeLinkId = homeLinkId;
    },

    getHomeLinkId: function(creep){
        return creep.memory.tasks.homeLinkId;
    },

    setTargetLinkId: function (creep, targetLinkId) {
        creep.memory.tasks.targetLinkId = targetLinkId;
    },

    getTargetLinkId: function(creep) {
        return creep.memory.tasks.targetLinkId;
    },
*/

    emptyTaskList: function(creep) {
        console.log(creep,"empty task list");
        creep.say("What to do?")
    }

}

module.exports = tasks;












































