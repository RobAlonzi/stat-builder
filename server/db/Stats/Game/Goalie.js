class GoalieStats {
    constructor({ meta, stats }){
        this.meta = meta;
        this.stats = stats.goalieStats;
    }

    save(){
        return new Promise(resolve => {
            setTimeout(() => {
              resolve(this);
            }, 2000);
        });
    }
}

module.exports = GoalieStats;