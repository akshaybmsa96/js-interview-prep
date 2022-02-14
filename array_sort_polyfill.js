Array.prototype.mySort = function (callback) {
  if (callback) {
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this.length; j++) {
        let val = callback(this[j], this[j + 1]);
        let temp;
        if (val > 0) {
          temp = this[j];
          this[j] = this[j + 1];
          this[j + 1] = temp;
        }
      }
    }
  } else {
    this.sort();
  }
};

//complexity O(n^2)
