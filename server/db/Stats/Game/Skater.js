class PlayerStats {
    constructor({ meta, stats }){
        this.meta = meta;
        this.stats = stats.skaterStats;
    }

    save(){
        return new Promise(resolve => {
            setTimeout(() => {
              resolve(this);
            }, 2000);
        });
    }
}

module.exports = PlayerStats;