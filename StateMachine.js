// Generated by CoffeeScript 1.9.3
var State, StateAction, StateMachine;

StateMachine = (function() {
  function StateMachine(stateList) {
    var base;
    this.stateList = stateList;
    this.currentState = this.stateList[0];
    if (typeof (base = this.currentState).onEnter === "function") {
      base.onEnter();
    }
  }

  StateMachine.prototype.selectNextState = function() {
    var base, base1;
    if (typeof (base = this.currentState).onExit === "function") {
      base.onExit();
    }
    this.currentState = this.currentState.testForNextState();
    return typeof (base1 = this.currentState).onEnter === "function" ? base1.onEnter() : void 0;
  };

  StateMachine.prototype.executeCurrentState = function() {
    this.currentState.execute();
    return this.selectNextState();
  };

  StateMachine.prototype.reset = function() {
    return this.currentState = this.stateList[0];
  };

  return StateMachine;

})();

State = (function() {
  function State(id, name, executeFunction, actionList) {
    this.id = id;
    this.name = name;
    this.executeFunction = executeFunction;
    this.actionList = actionList;
  }

  State.prototype.executeState = function(callback) {
    this.loopFunction();
    return typeof callback === "function" ? callback() : void 0;
  };

  State.prototype.testForNextState = function() {
    var action, i, len, ref;
    ref = this.actionList;
    for (i = 0, len = ref.length; i < len; i++) {
      action = ref[i];
      if (action.testCondition()) {
        return action.nextState;
      }
    }
    return this;
  };

  State.prototype.execute = function() {
    return this.executeFunction();
  };

  State.prototype.onEnter = null;

  State.prototype.onExit = null;

  return State;

})();

StateAction = (function() {
  function StateAction(testCondition, nextState) {
    this.testCondition = testCondition;
    this.nextState = nextState;
  }

  return StateAction;

})();
