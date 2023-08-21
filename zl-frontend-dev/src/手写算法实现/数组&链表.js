{
  class NumArray {
    constructor(nums) {
      //
    }

    /* 查询闭区间 [left, right] 的累加和 */
    sumRange(left, right) {}
  }
}

{
  class NumArray {
    constructor(nums) {
      this.nums = nums;
    }

    /* 查询闭区间 [left, right] 的累加和 */
    sumRange(left, right) {
      let res = 0;
      for (let i = left; i <= right; i++) {
        res += this.nums[i];
      }

      return res;
    }
  }
}

{
  class NumArray {
    // 前缀和数组
    preSum = [];

    /* 输入一个数组，构造前缀和 */
    constructor(nums) {
      // 便于计算累加和
      this.preSum[0] = 0;
      // 计算 nums 的累加和
      for (let i = 1; i <= nums.length; i++) {
        this.preSum[i] = this.preSum[i - 1] + nums[i - 1];
      }
    }

    /* 查询闭区间 [left, right] 的累加和 */
    sumRange(left, right) {
      return this.preSum[right + 1] - this.preSum[left];
    }
  }
}

{
  class NumMatrix {
    // preSum[i][j] 记录矩阵 [0, 0, i, j] 的元素和
    preSum;

    constructor(matrix) {
      let m = matrix.length;
      let n = matrix[0].length;
      // 构造前缀和矩阵
      this.preSum = [];
      for (let i = 0; i <= m; i++) {
        this.preSum[i] = new Array(n + 1).fill(0);
      }

      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          // 计算每个矩阵 [0, 0, i, j] 的元素和
          this.preSum[i][j] =
            this.preSum[i - 1][j] +
            this.preSum[i][j - 1] +
            matrix[i - 1][j - 1] -
            this.preSum[i - 1][j - 1];
        }
      }
    }

    // 计算子矩阵 [x1, y1, x2, y2] 的元素和
    sumRange(x1, y1, x2, y2) {
      // 目标矩阵之和由四个相邻矩阵运算获得
      return (
        this.preSum[x2 + 1][y2 + 1] -
        this.preSum[x1][y2 + 1] -
        this.preSum[x2 + 1][y1] +
        this.preSum[x1][y1]
      );
    }
  }

  let at = new NumMatrix([
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
  ]);
  console.log('====>>', at.sumRange(1, 1, 2, 2));
}

{
  const subArraySum = (nums, k) => {
    let n = nums.length;
    // 构造前缀和
    let preSum = new Array(n + 1).fill(0);
    for (let i = 0; i <= n; i++) {
      preSum[i + 1] = preSum[i] + nums[i];
    }

    let res = 0;
    // 穷举所有子数组
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j < i; j++) {
        // 子数组 nums[j..i-1] 的元素和
        if (preSum[i] - preSum[j] === k) {
          res++;
        }
      }
    }

    return res;
  };
}

{
  const subArraySum = (nums, k) => {
    let n = nums.length;
    // map：前缀和 -> 该前缀和出现的次数
    const preSum = new Map();
    // base case
    preSum.set(0, 1);

    let res = 0;
    let sum0_i = 0;
    for (let i = 0; i < n; i++) {
      sum0_i += nums[i];
      // 这是我们想找的前缀和 nums[0..j]
      let sum0_j = sum0_i - k;
      // 如果前面有这个前缀和，则直接更新答案
      if (preSum.has(sum0_j)) {
        res += preSum.get(sum0_j);
      }
      // 把前缀和 nums[0..i] 加入并记录出现次数
      let oderSum = preSum.get(sum0_i);
      oderSum ? preSum.set(sum0_i, oderSum + 1) : preSum.set(sum0_i, 1);
    }

    return res;
  };

  console.log('====>>>subArraySum', subArraySum([3, 5, 2, -2, 4, 1], 5));
}

{
  const nums = [];

  const diff = [];
  // 构造差分数组
  diff[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    diff[i] = nums[i] - nums[i - 1];
  }
}

{
  let res = [];
  // 根据差分数组构造结果数组
  res[0] = diff[0];
  for (let i = 1; i < diff.length; i++) {
    res[i] = res[i - 1] + diff[i];
  }
}

{
  // 差分数组工具类
  class Difference {
    diff = [];
    /* 输入一个初始数组，区间操作将在这个数组上进行 */
    constructor(nums) {
      let n = nums.length;
      // 根据初始数组构造差分数组
      this.diff[0] = nums[0];
      for (let i = 1; i < nums.length; i++) {
        this.diff[i] = nums[i] - nums[i - 1];
      }
    }

    /* 给闭区间 [i,j] 增加 val（可以是负数）*/
    increment(i, j, val) {
      this.diff[i] += val;
      if (j + 1 < this.diff.length) {
        this.diff[j + 1] -= val;
      }
    }

    /* 返回结果数组 */
    result() {
      let res = [];
      // 根据差分数组构造结果数组
      res[0] = this.diff[0];
      for (let i = 1; i < this.diff.length; i++) {
        res[i] = res[i - 1] + this.diff[i];
      }

      return res;
    }
  }

  const getModifiedArray = (length, upDates) => {
    // nums 初始化为全 0
    const nums = new Array(length).fill(0);
    // 构造差分解法
    const df = new Difference(nums);

    upDates.forEach((subArr) => {
      df.increment(...subArr);
    });

    return df.result();
  };

  console.log(
    getModifiedArray(5, [
      [1, 3, 2],
      [2, 4, 3],
      [0, 2, -2],
    ])
  );
}

{
  // 差分数组工具类
  class Difference {
    diff = [];
    /* 输入一个初始数组，区间操作将在这个数组上进行 */
    constructor(nums) {
      let n = nums.length;
      // 根据初始数组构造差分数组
      this.diff[0] = nums[0];
      for (let i = 1; i < nums.length; i++) {
        this.diff[i] = nums[i] - nums[i - 1];
      }
    }

    /* 给闭区间 [i,j] 增加 val（可以是负数）*/
    increment(i, j, val) {
      this.diff[i] += val;
      if (j + 1 < this.diff.length) {
        this.diff[j + 1] -= val;
      }
    }

    /* 返回结果数组 */
    result() {
      let res = [];
      // 根据差分数组构造结果数组
      res[0] = this.diff[0];
      for (let i = 1; i < this.diff.length; i++) {
        res[i] = res[i - 1] + this.diff[i];
      }

      return res;
    }
  }

  const corpFlightBookings = (bookings, n) => {
    // nums 初始化为全 0
    const nums = new Array(n).fill(0);
    // 构造差分解法
    const df = new Difference(nums);
    // 注意转成数组索引要减一哦
    bookings.forEach((sub) => {
      let i = bookings[0] - 1;
      let j = bookings[1] - 1;
      let val = bookings[2];
      // 对区间 nums[i..j] 增加 val
      df.increment(i, j, val);
    });

    // 返回最终的结果数组
    return df.result();
  };
}

{
  // 差分数组工具类
  class Difference {
    diff = [];
    /* 输入一个初始数组，区间操作将在这个数组上进行 */
    constructor(nums) {
      let n = nums.length;
      // 根据初始数组构造差分数组
      this.diff[0] = nums[0];
      for (let i = 1; i < nums.length; i++) {
        this.diff[i] = nums[i] - nums[i - 1];
      }
    }

    /* 给闭区间 [i,j] 增加 val（可以是负数）*/
    increment(i, j, val) {
      this.diff[i] += val;
      if (j + 1 < this.diff.length) {
        this.diff[j + 1] -= val;
      }
    }

    /* 返回结果数组 */
    result() {
      let res = [];
      // 根据差分数组构造结果数组
      res[0] = this.diff[0];
      for (let i = 1; i < this.diff.length; i++) {
        res[i] = res[i - 1] + this.diff[i];
      }

      return res;
    }
  }

  const carPooling = (trips, capacity) => {
    // 最多有 1000 个车站
    const nums = new Array(1001).fill(0);
    const df = new Difference(nums);

    trips.forEach((trip) => {
      // 乘客数量
      let val = trip[0];
      // 第 trip[1] 站乘客上车
      let i = trip[1];
      // 第 trip[2] 站乘客已经下车，
      // 即乘客在车上的区间是 [trip[1], trip[2] - 1]
      let j = trip[2] - 1;
      df.increment(i, j, val);
    });

    let res = df.result();
    // 客车自始至终都不应该超载
    for (let i = 0; i < res.length; i++) {
      if (capacity < res[i]) {
        return false;
      }
    }

    return true;
  };
}

{
  const mergeTwoLists = (l1, l2) => {
    // 虚拟头结点
    const dummy = {
      val: -1,
      next: null,
    };
    let p = dummy;
    let p1 = l1;
    let p2 = l2;

    while (p1 !== null && p2 !== null) {
      // 比较 p1 和 p2 两个指针
      // 将值较小的的节点接到 p 指针
      if (p1.val > p2.val) {
        p.next = p2;
        p2 = p2.next;
      } else {
        p.next = p1;
        p1 = p1.next;
      }
      // p 指针不断前进
      p = p.next;
    }

    if (p1 !== null) {
      p.next = p1;
    }
    if (p2 !== null) {
      p.next = p2;
    }

    return dummy.next;
  };
}

{
  // 返回链表的倒数第 k 个节点
  const findFromEnd = (head, k) => {
    let p1 = head;

    // p1 先走 k 步
    for (let i = 0; i < k; i++) {
      p1 = p1.next;
    }

    let p2 = head;
    // p1 和 p2 同时走 n - k 步
    while (p1 !== null) {
      p2 = p2.next;
      p1 = p1.next;
    }

    // p2 现在指向第 n - k 个节点
    return p2;
  };
}

{
  // 返回链表的倒数第 k 个节点
  const findFromEnd = (head, k) => {
    let p1 = head;

    // p1 先走 k 步
    for (let i = 0; i < k; i++) {
      p1 = p1.next;
    }

    let p2 = head;
    // p1 和 p2 同时走 n - k 步
    while (p1 !== null) {
      p2 = p2.next;
      p1 = p1.next;
    }

    // p2 现在指向第 n - k 个节点
    return p2;
  };

  // 主函数
  const removeNthFromEnd = (head, n) => {
    // 虚拟头节点
    let dummy = {
      val: -1,
      next: null,
    };
    dummy.next = head;
    // 删除倒数第 n 个，要先找倒数第 n + 1 个节点
    let x = findFromEnd(head, n + 1);
    // 删掉倒数第 n 个节点
    x.next = x.next.next;

    return dummy.next;
  };
}

{
  const middleNode = (head) => {
    // 快慢指针初始化指向 head
    let slow = head;
    let fast = head;
    // 快指针走到末尾时停止
    while (fast !== null && fast.next !== null) {
      // 慢指针走一步，快指针走两步
      slow = slow.next;
      fast = fast.next.next;
    }

    // 慢指针指向中点
    return slow;
  };
}

{
  const hasCycle = (head) => {
    // 快慢指针初始化指向 head
    let slow = head;
    let fast = head;
    // 快指针走到末尾时停止
    while (fast !== null && fast.next !== null) {
      // 慢指针走一步，快指针走两步
      slow = slow.next;
      fast = fast.next.next;
      if (fast === slow) {
        return true;
      }
    }

    // 不包含环
    return false;
  };
}

{
  const detectCycle = (head) => {
    // 快慢指针初始化指向 head
    let slow = head;
    let fast = head;

    // 快指针走到末尾时停止
    while (fast !== null && fast.next !== null) {
      // 慢指针走一步，快指针走两步
      slow = slow.next;
      fast = fast.next.next;
      if (fast === slow) {
        break;
      }
    }

    // 上面的代码类似 hasCycle 函数
    if (fast === null || fast.next === null) {
      // fast 遇到空指针说明没有环
      return null;
    }

    // 重新指向头结点
    slow = head;
    // 快慢指针同步前进，相交点就是环起点
    while (slow !== fast) {
      fast = fast.next;
      slow = slow.next;
    }

    return slow;
  };
}

{
  const getIntersectionNode = (headA, headB) => {
    // p1 指向 A 链表头结点，p2 指向 B 链表头结点
    let p1 = headA;
    let p2 = headB;

    // p1 和 p2 都为null的时候也会跳出循环
    while (p1 !== p2) {
      // p1 走一步，如果走到 A 链表末尾，转到 B 链表
      if (p1 === null) {
        p1 = headB;
      } else {
        p1 = p1.next;
      }

      if (p2 === null) {
        // p2 走一步，如果走到 B 链表末尾，转到 A 链表
        p2 = headA;
      } else {
        p2 = p2.next;
      }
    }

    return p1;
  };
}

{
  const removeDuplicates = (nums) => {
    if (nums.length === 0) {
      return 0;
    }
    let slow = 0;
    let fast = 0;
    while (fast < nums.length) {
      if (nums[fast] !== nums[slow]) {
        slow++;
        // 维护 nums[0..slow] 无重复
        nums[slow] = nums[fast];
      }
      fast++;
    }

    // 数组长度为索引 + 1
    return slow + 1;
  };

  console.log('====>>>removeDuplicates', removeDuplicates([1, 1, 2]));
}

{
  const deleteDuplicates = (head) => {
    let slow = head;
    let fast = head;

    while (fast !== null) {
      if (fast.val !== slow.val) {
        slow.next = fast;
        slow = slow.next;
      }
      fast = fast.next;
    }

    // 断开与后面重复元素的连接
    slow.next = null;
    return head;
  };
}

{
  const removeElement = (nums, val) => {
    let fast = 0;
    let slow = 0;
    while (fast < nums.length) {
      if (nums[fast] !== val) {
        nums[slow] = nums[fast];
        slow++;
      }
      fast++;
    }

    return slow;
  };
}

{
  const removeElement = (nums, val) => {
    let fast = 0;
    let slow = 0;
    while (fast < nums.length) {
      if (nums[fast] !== val) {
        nums[slow] = nums[fast];
        slow++;
      }
      fast++;
    }

    return slow;
  };
  const moveZeroes = (nums) => {
    // 去除 nums 中的所有 0，返回不含 0 的数组长度
    let p = removeElement(nums, 0);

    for (; p < nums.length; p++) {
      nums[p] = 0;
    }
  };
}

{
  const twoSum = (nums, target) => {
    // 一左一右两个指针相向而行
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
      let sum = nums[left] + nums[right];
      if (sum === target) {
        // 题目要求的索引是从 1 开始的
        return [left + 1, right + 1];
      } else if (sum > target) {
        // 让 sum 小一点
        right--;
      } else {
        // 让 sum 大一点
        left++;
      }
    }

    return [-1, -1];
  };

  console.log('===>>twoSum', twoSum([2, 7, 11, 15], 9));
}

{
  const reverse = (s) => {
    // 一左一右两个指针相向而行
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
      // 交换 s[left] 和 s[right]
      let temp = s[left];
      s[left] = s[right];
      s[right] = temp;
      left++;
      right--;
    }

    return s;
  };
}

{
  const isPalindrome = (s) => {
    // 一左一右两个指针相向而行
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }

      left++;
      right--;
    }

    return true;
  };
}

{
  // 在 s 中寻找以 s[l] 和 s[r] 为中心的最长回文串
  const palindrome = (s, l, r) => {
    // 防止索引越界
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      // 双指针，向两边展开
      l--;
      r++;
    }
    // 返回以 s[l] 和 s[r] 为中心的最长回文串
    return s.slice(l + 1, r);
  };
}

{
  // 在 s 中寻找以 s[l] 和 s[r] 为中心的最长回文串
  const palindrome = (s, l, r) => {
    // 防止索引越界
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      // 双指针，向两边展开
      l--;
      r++;
    }
    // 返回以 s[l] 和 s[r] 为中心的最长回文串
    return s.slice(l + 1, r);
  };

  const longestPalindrome = (s) => {
    let res = '';
    for (let i = 0; i < s.length; i++) {
      // 以 s[i] 为中心的最长回文子串
      let s1 = palindrome(s, i, i);
      // 以 s[i] 和 s[i+1] 为中心的最长回文子串
      let s2 = palindrome(s, i, i + 1);
      // res = longest(res, s1, s2)
      res = res.length > s1.length ? res : s1;
      res = res.length > s2.length ? res : s2;
    }

    return res;
  };

  console.log('=====>>>>longestPalindrome', longestPalindrome('babad'));
}

{
  const need = new Map();
  const window = new Map();
  for (let i = 0; i < t.length; i++) {
    need.has(t[i]) ? need.set(t[i], need.get(t[i]) + 1) : need.set(t[i], 1);
  }
}

{
  const minWindow = (s, t) => {
    const need = new Map();
    const window = new Map();
    for (let i = 0; i < t.length; i++) {
      window.set(t[i], 0);
      need.has(t[i]) ? need.set(t[i], need.get(t[i]) + 1) : need.set(t[i], 1);
    }

    let left = 0;
    let right = 0;
    let valid = 0;
    // 记录最小覆盖子串的起始索引及长度
    let start = 0;
    let len = Infinity;
    while (right < s.length) {
      // c 是将移入窗口的字符
      let c = s[right];
      // 扩大窗口
      right++;
      // 进行窗口内数据的一系列更新
      if (need.has(c)) {
        window.set(c, window.get(c) + 1);
        if (window.get(c) === need.get(c)) {
          valid++;
        }
      }

      // 判断左侧窗口是否要收缩
      while (valid === need.size) {
        // 在这里更新最小覆盖子串
        if (right - left < len) {
          start = left;
          len = right - left;
        }
        // d 是将移出窗口的字符
        let d = s[left];
        // 缩小窗口
        left++;
        // 进行窗口内数据的一系列更新
        if (need.has(d)) {
          if (window.get(d) === need.get(d)) {
            valid--;
          }
          window.set(d, window.get(d) - 1);
        }
      }
    }

    // 返回最小覆盖子串
    return len === Infinity ? '' : s.substr(start, len);
  };

  console.log('=====>>>>minWindow', minWindow('adobecodebanc', 'abc'));
}

{
  // 判断 s 中是否存在 t 的排列
  const checkInclusion = (t, s) => {
    const need = new Map();
    const window = new Map();
    for (let i = 0; i < t.length; i++) {
      let tChar = t[i];
      window.set(tChar, 0);
      need.has(tChar)
        ? need.set(tChar, need.get(tChar) + 1)
        : need.set(tChar, 1);
    }

    let left = 0;
    let right = 0;
    let valid = 0;

    while (right < s.length) {
      let c = s[right];
      right++;
      // 进行窗口内数据的一系列更新
      if (need.has(c)) {
        window.set(c, window.get(c) + 1);
        if (window.get(c) === need.get(c)) {
          valid++;
        }
      }

      // 判断左侧窗口是否要收缩
      while (right - left >= t.length) {
        // 在这里判断是否找到了合法的子串
        if (valid === need.size) {
          return true;
        }
        let d = s[left];
        left++;
        // 进行窗口内数据的一系列更新
        if (need.has(d)) {
          if (window.get(d) === need.get(d)) {
            valid--;
          }
          window.set(d, window.get(d) - 1);
        }
      }
    }
  };

  console.log('=====>>>>checkInclusion', checkInclusion('ab', 'eidbaooo'));
}

{
  const findAnagrams = (s, t) => {
    const need = new Map();
    const window = new Map();

    for (let i = 0; i < t.length; i++) {
      let tChar = t[i];
      window.set(tChar, 0);
      need.has(tChar)
        ? need.set(tChar, need.get(tChar) + 1)
        : need.set(tChar, 1);
    }

    let left = 0;
    let right = 0;
    let valid = 0;
    const res = [];

    while (right < s.length) {
      let c = s[right];
      right++;
      // 进行窗口内数据的一系列更新
      if (need.has(c)) {
        window.set(c, window.get(c) + 1);
        if (window.get(c) === need.get(c)) {
          valid++;
        }
      }

      // 判断左侧窗口是否要收缩
      while (right - left >= t.length) {
        // 当窗口符合条件时，把起始索引加入 res
        if (valid === need.size) {
          res.push(left);
        }
        let d = s[left];
        left++;
        // 进行窗口内数据的一系列更新
        if (need.has(d)) {
          if (window.get(d) === need.get(d)) {
            valid--;
          }
          window.set(d, window.get(d) - 1);
        }
      }
    }

    return res;
  };

  console.log('====>>>findAnagrams', findAnagrams('cbaebabacd', 'abc'));
}

{
  const lengthOfLongestSubStrings = (s) => {
    const window = new Map();

    let left = 0;
    let right = 0;
    let res = 0; // 记录结果

    while (right < s.length) {
      let c = s[right];
      right++;
      // 进行窗口内数据的一系列更新
      window.has(c) ? window.set(c, window.get(c) + 1) : window.set(c, 1);

      // 判断左侧窗口是否要收缩
      while (window.get(c) > 1) {
        let d = s[left];
        left++;
        // 进行窗口内数据的一系列更新
        window.set(d, window.get(d) - 1);
      }

      // 在这里更新答案
      res = Math.max(res, right - left);
    }

    return res;
  };

  console.log(
    '-->>>lengthOfLongestSubStrings',
    lengthOfLongestSubStrings('bbbbbb')
  );
  console.log(
    '-->>>lengthOfLongestSubStrings',
    lengthOfLongestSubStrings('abcabcdd')
  );
}

{
  const binarySearch = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return -1;
  };

  console.log('====>>>binarySearch', binarySearch([1, 2, 3, 4, 5], 2));
}

{
  // 搜索左侧边界
  const left_bound = (nums, target) => {
    if (nums.length === 0) return -1;
    let left = 0;
    let right = nums.length; // 注意

    while (left < right) {
      // 注意
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        // 当找到 target 时，收缩右侧边界
        right = mid;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] > target) {
        right = mid - 1;
      }
    }

    return left;
  };
}

{
  const pros = new Promise((resolve) => {
    setTimeout(() => {
      resolve('123');
    }, 2000);
  });

  const te = async () => {
    let at = await pros;
    console.log('==>>>>at', at);
  };

  te();

  setTimeout(async () => {
    console.log('===>pros', pros);
    let oo = await pros;
    console.log('===>oo', oo);
  }, 4000);
}

{
  const left_bound = (nums, target) => {
    // 搜索区间为 [left, right]
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      let mid = left + (right - left) / 2;
      // if else ...
    }
  };
}

{
  const left_bound = (nums, target) => {
    // 搜索区间为 [left, right]
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor((right + left) / 2);
      if (nums[mid] < target) {
        // 搜索区间变为 [mid+1, right]
        left = mid + 1;
      } else if (nums[mid] > target) {
        // 搜索区间变为 [left, mid-1]
        right = mid - 1;
      } else if (nums[mid] == target) {
        // 收缩右侧边界
        right = mid - 1;
      }
    }

    // 检查出界情况
    if (left >= nums.length || nums[left] != target) return -1;
    return left;
  };
}

{
  // 搜索右侧边界
  const right_bound = (nums, target) => {
    if (nums.length === 0) return -1;
    let left = 0;
    let right = nums.length;

    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        // 当找到 target 时，收缩左侧边界
        left = mid + 1; // 注意
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] > target) {
        right = mid;
      }
    }

    return left - 1; // 注意
  };

  console.log('====>>right_bound', right_bound([1, 2, 3, 3, 4, 6, 6], 3));
}

{
  const right_bound = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] > target) {
        right = mid - 1;
      } else if (nums[mid] === target) {
        // 这里改成收缩左侧边界即可
        left = mid + 1;
      }
    }
    // 这里改为检查 right 越界的情况，见下图
    if (right < 0 || nums[right] != target) return -1;
    return right;
  };
}

{
  const binarySearch = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] > target) {
        right = mid - 1;
      }
    }

    // 直接返回
    return -1;
  };

  const left_bound = (nums, target) => {
    // 搜索区间为 [left, right]
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor((right + left) / 2);
      if (nums[mid] < target) {
        // 搜索区间变为 [mid+1, right]
        left = mid + 1;
      } else if (nums[mid] > target) {
        // 搜索区间变为 [left, mid-1]
        right = mid - 1;
      } else if (nums[mid] == target) {
        // 别返回，锁定左侧边界
        right = mid - 1;
      }
    }

    // 最后要检查 left 越界的情况
    if (left >= nums.length || nums[left] !== target) return -1;
    return left;
  };

  const right_bound = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] > target) {
        right = mid - 1;
      } else if (nums[mid] === target) {
        // 别返回，锁定右侧边界
        left = mid + 1;
      }
    }
    // 最后要检查 right 越界的情况
    if (right < 0 || nums[right] != target) return -1;
    return right;
  };
}

{
  // 函数 f 是关于自变量 x 的单调递增函数
  const f = (x, nums) => {
    return nums[x];
  };

  const left_bound = (nums, target) => {
    if (nums.length === 0) return -1;
    let left = 0;
    let right = nums.length; // 注意

    while (left < right) {
      // 注意
      let mid = Math.floor((left + right) / 2);
      if (f(mid, nums) === target) {
        // 当找到 target 时，收缩右侧边界
        right = mid;
      } else if (f(mid, nums) < target) {
        left = mid + 1;
      } else if (f(mid, nums) > target) {
        right = mid;
      }
    }

    return left;
  };
}

{
  // 函数 f 是关于自变量 x 的单调递增函数
  const f = (x) => {
    // ...
  };

  // 主函数，在 f(x) === target 的约束下求 x 的最值
  const solution = (nums, target) => {
    if (nums.length === 0) return -1;
    // 问自己： 自变量 x 的最小值是多少；
    // let left = ...;
    // 问自己： 自变量 x 的最大值是多少；
    // let right = ... + 1; // 注意

    while (left < right) {
      // 注意
      let mid = Math.floor((left + right) / 2);
      if (f(mid, nums) === target) {
        // 问自己： 题目是求做边界还是右边界；
        // ...
      } else if (f(mid, nums) < target) {
        // 问自己： 怎么让 f(x) 大一点；
        // ...
      } else if (f(mid, nums) > target) {
        // 问自己： 怎么让 f(x) 小一点；
        // ...
      }
    }

    return left;
  };
}

{
  // 定义：速度为 x 时，需要 f(x) 小时吃完多有香蕉
  // f(x) 随着 x 的增加单调递减
  const f = (piles, x) => {
    let hours = 0;
    for (let i = 0; i < piles.length; i++) {
      hours += Math.floor(piles[i] / x);
      if (piles[i] % x > 0) {
        hours++;
      }
    }

    return hours;
  };

  const minEatingSpeed = (piles, H) => {
    let left = 1;
    // 注意，right 是开区间，所以再加一
    let right = 1000000000 + 1;

    while (left < right) {
      let mid = Math.floor((right + left) / 2);
      if (f(piles, mid) === H) {
        // 搜索左侧边界，则需要搜索右侧边界
        right = mid;
      } else if (f(piles, mid) < H) {
        // 需要让 f(x) 的返回值大一些
        right = mid;
      } else if (f(piles, mid) > H) {
        // 要让 f(x) 的返回值小一些
        left = mid + 1;
      }
    }

    return left;
  };

  console.log('====>>>minEatingSpeed', minEatingSpeed([3, 6, 7, 11], 8));
}

{
  // 定义：当运载能力为 x 时，需要 f(x) 天运完货物
  // f(x) 随着 x 的增加单调递减
  const f = (weights, x) => {
    let days = 0;
    for (let i = 0; i < weights.length; ) {
      // 尽可能多装货物
      let cap = x;
      while (i < weights.length) {
        if (cap < weights[i]) {
          break;
        } else {
          cap -= weights[i];
        }
        i++;
      }
      days++;
    }

    return days;
  };

  const shipWithinDays = (weights, days) => {
    let left = 0;
    // 注意，right 是开区间，所以额外加一
    let right = 1;
    for (let w of weights) {
      left = Math.max(left, w);
      right += w;
    }

    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (f(weights, mid) === days) {
        // 搜索左侧边界，则需要收缩右侧边界
        right = mid;
      } else if (f(weights, mid) < days) {
        // 需要让 f(x) 的返回值大一些
        right = mid;
      } else if (f(weights, mid) > days) {
        // 需要让 f(x) 的返回值小一些
        left = mid + 1;
      }
    }

    return left;
  };
}

{
  // 定义：当运载能力为 x 时，需要 f(x) 天运完货物
  // f(x) 随着 x 的增加单调递减
  const f = (nums, x) => {
    let sub = 0;
    for (let i = 0; i < nums.length; ) {
      // 尽可能多装货物
      let cap = x;
      while (i < nums.length) {
        if (cap < nums[i]) {
          break;
        } else {
          cap -= nums[i];
        }
        i++;
      }
      sub++;
    }

    return sub;
  };

  const splitArray = (nums, m) => {
    let left = 0;
    // 注意，right 是开区间，所以额外加一
    let right = 1;
    for (let w of nums) {
      left = Math.max(left, w);
      right += w;
    }

    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (f(nums, mid) === m) {
        // 搜索左侧边界，则需要收缩右侧边界
        right = mid;
      } else if (f(nums, mid) < m) {
        // 需要让 f(x) 的返回值大一些
        right = mid;
      } else if (f(nums, mid) > m) {
        // 需要让 f(x) 的返回值小一些
        left = mid + 1;
      }
    }

    return left;
  };

  console.log('=====>>>splitArray', splitArray([7, 2, 5, 10, 8], 2));
}

{
  const advantageCount = (nums1, nums2) => {
    let n = nums1.length;
    // 给 nums2 降序排序;
    const maxpq = [...nums2].map((val, index) => ({ index: index, val: val }));
    maxpq.sort((a, b) => b.val - a.val);
    // 给 nums1 升序排序
    nums1.sort((a, b) => a - b);
    // nums1[left] 是最小值，nums1[right] 是最大值
    let left = 0;
    let right = n - 1;
    let res = [];
    while (maxpq.length > 0) {
      let pair = maxpq.shift();
      let i = pair.index;
      let maxVal = pair.val;
      if (maxVal < nums1[right]) {
        // 如果 nums1[right] 能胜过 maxval，那就自己上
        res[i] = nums1[right];
        right--;
      } else {
        // 否则用最小值混一下，养精蓄锐
        res[i] = nums1[left];
        left++;
      }
    }

    return res;
  };

  console.log(
    '====>>>advantageCount',
    advantageCount([12, 24, 8, 32], [13, 25, 32, 11])
  );
}

{
  // 单链表节点的结构
  class ListNode {
    next = null;
    constructor(val) {
      this.val = val;
    }
  }
}

{
  const reverse = (head) => {
    if (head.next === null) return head;

    let last = reverse(head.next);

    head.next.next = head;

    head.next = null;
    return last;
  };
}

{
  // 将链表的前 n 个节点反转（n <= 链表长度）
  const reverseN = (head, n) => {};
}

{
  let successor = null; // 后驱节点

  // 反转以 head 为起点的 n 个节点，返回新的头结点
  const reverseN = (head, n) => {
    if (n === 1) {
      // 记录第 n + 1 个节点
      successor = head.next;
      return head;
    }
    // 以 head.next 为起点，需要反转前 n - 1 个节点
    const last = reverseN(head.next, n - 1);

    head.next.next = head;
    // 让反转之后的 head 节点和后面的节点连起来
    head.next = successor;
    return last;
  };
}

{
  let successor = null; // 后驱节点

  // 反转以 head 为起点的 n 个节点，返回新的头结点
  const reverseN = (head, n) => {
    if (n === 1) {
      // 记录第 n + 1 个节点
      successor = head.next;
      return head;
    }
    // 以 head.next 为起点，需要反转前 n - 1 个节点
    const last = reverseN(head.next, n - 1);

    head.next.next = head;
    // 让反转之后的 head 节点和后面的节点连起来
    head.next = successor;
    return last;
  };

  const reverseBetween = (head, m, n) => {
    // base case
    if (m == 1) {
      // 相当于反转前 n 个元素
      return reverseN(head, n);
    }
    // 前进到反转的起点触发 base case
    head.next = reverseBetween(head.next, m - 1, n - 1);
    return head;
  };
}

{
  const isValid = (str) => {
    // 待匹配的左括号数量
    let left = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') {
        left++;
      } else {
        // 遇到右括号
        left--;
      }

      // 右括号太多
      if (left === -1) {
        return false;
      }
    }

    // 是否所有的左括号都被匹配了
    return left === 0;
  };
}

{
  const isValid = (str) => {
    // stack
    let left = [];
    for (let i = 0; i < str.length; i++) {
      let c = str[i];
      if (c === '(' || c === '{' || c === '[') {
        left.push(c);
      } else {
        // 字符 c 是右括号
        if (left.length > 0 && leftof(c) === left[left.length - 1]) {
          left.pop();
        } else {
          // 和最近的左括号不匹配
          return false;
        }
      }
    }

    // 是否所有的左括号都被匹配了
    return left.length === 0;
  };

  const leftof = (c) => {
    if (c === ')') {
      return '(';
    } else if (c === '}') {
      return '{';
    } else {
      return '[';
    }
  };
}

{
  const minAddToMakeValid = (s) => {
    // res 记录插入次数
    let res = 0;
    // need 变量记录右括号的需求量
    let need = 0;

    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') {
        // 对右括号的需求 + 1
        need++;
      }

      if (s[i] === ')') {
        // 对右括号的需求 - 1
        need--;

        if (need === -1) {
          need = 0;
          // 需插入一个左括号
          res++;
        }
      }
    }

    return res + need;
  };
}

{
  const minInsertions = (s) => {
    // res 记录插入次数
    let res = 0;
    // need 变量记录右括号的需求量
    let need = 0;

    for (let i = 0; i < s.length; i++) {
      // 一个左括号对应两个右括号
      if (s[i] === '(') {
        // 对右括号的需求 + 1
        need += 2;
        if (need % 2 === 1) {
          res++;
          need--;
        }
      }

      if (s[i] === ')') {
        // 对右括号的需求 - 1
        need--;
        if (need === -1) {
          res++;
          need = 1;
        }
      }
    }

    return res + need;
  };
}

{
  const nextGreaterElement = (nums) => {
    let n = nums.length;
    // 存放答案的数组
    let res = [];
    // stack
    let s = [];
    // 倒着往栈里放
    for (let i = n - 1; i >= 0; i--) {
      // 判定个子高矮
      while (s.length > 0 && s[s.length - 1] <= nums[i]) {
        // 矮个起开，反正也被挡着了。。。
        s.pop();
      }
      // nums[i] 身后的更大元素
      res[i] = s.length === 0 ? -1 : s[s.length - 1];
      s.push(nums[i]);
    }

    return res;
  };

  console.log('====>>nextGreaterElement', nextGreaterElement([2, 1, 2, 4, 3]));
}

{
  const nextGreaterElementInOtheer = (nums1, nums2) => {
    // 记录 nums2 中每个元素的下一个更大元素
    const greater = nextGreaterElement(nums2);
    // 转化成映射：元素 x -> x 的下一个最大元素
    const greaterMap = new Map();
    for (let i = 0; i < nums2; i++) {
      greaterMap.set(nums2[i], greater[i]);
    }
    // nums1 是 nums2 的子集，所以根据 greaterMap 可以得到结果
    let res = [];
    for (let i = 0; i < nums1.length; i++) {
      res[i] = greaterMap.get(nums1[i]);
    }

    return res;
  };

  const nextGreaterElement = (nums) => {
    let n = nums.length;
    // 存放答案的数组
    let res = [];
    // stack
    let s = [];
    // 倒着往栈里放
    for (let i = n - 1; i >= 0; i--) {
      // 判定个子高矮
      while (s.length > 0 && s[s.length - 1] <= nums[i]) {
        // 矮个起开，反正也被挡着了。。。
        s.pop();
      }
      // nums[i] 身后的更大元素
      res[i] = s.length === 0 ? -1 : s[s.length - 1];
      s.push(nums[i]);
    }

    return res;
  };
}

{
  const dailyTemperatures = (temperatures) => {
    let n = temperatures.length;
    let res = [];
    // 这里放元素索引，而不是元素
    let s = [];
    /* 单调栈模板 */
    for (let i = n - 1; i >= 0; i--) {
      while (s.length > 0 && temperatures[s[s.length - 1]] <= temperatures[i]) {
        s.pop();
      }
      // 得到索引间距
      res[i] = s.length === 0 ? 0 : s[s.length - 1] - i;
      // 将索引入栈，而不是元素
      s.push(i);
    }

    return res;
  };
}

{
  let arr = [1, 2, 3, 4, 5];
  let n = arr.length;
  let index = 0;
  // while (true) {
  // 在环形数组中转圈
  console.log(arr[index % n]);
  index++;
  // }
}

{
  const nextGreaterElements = (nums) => {
    let n = nums.length;
    let res = [];
    let s = [];
    // 数组长度加倍模拟环形数组
    for (let i = 2 * n - 1; i >= 0; i--) {
      // 索引 i 要求模，其他的和模板一样
      while (s.length > 0 && s[s.length - 1] <= nums[i % n]) {
        s.pop();
      }
      res[i % n] = s.length === 0 ? -1 : s[s.length - 1];
      s.push(nums[i % n]);
    }

    return res;
  };

  console.log(
    '====>>nextGreaterElements',
    nextGreaterElements([2, 1, 2, 4, 3])
  );
}

{
  const maxSlidingWindow = (nums, k) => {
    const window = new MonotonicQueue();
    let res = [];

    for (let i = 0; i < nums.length; i++) {
      if (i < k - 1) {
        //先把窗口的前 k - 1 填满
        window.push(nums[i]);
      } else {
        // 窗口开始向前滑动
        // 移入新元素
        window.push(nums[i]);
        // 将当前窗口中的最大元素记入结果
        res.push(window.max());
        // 移出最后的元素
        window.pop(nums[i - k + 1]);
      }
    }

    return res;
  };

  class MonotonicQueue {
    // 双链表，支持头部和尾部增删元素
    // 维护其中的元素自尾部到头部单调递增
    constructor() {
      this.maxq = 1;
    }
  }
}

{
  const removeDuplicateLetters = (s) => {
    // 存放去重的结果
    let stk = [];
    // 布尔数组初始值为 false，记录栈中是否存在某个字符
    // 输入字符均为 ASCII 字符，所以大小 256 够用了
    let inStack = new Array(256).fill(false);

    for (let i = 0; i < s.length; i++) {
      let c = s[i];
      let index = c.charCodeAt();
      // 如果字符 c 存在栈中，直接跳过
      if (inStack[index]) continue;
      // 若不存在，则插入栈顶并标记为存在
      stk.push(c);
      inStack[index] = true;
    }

    let sb = [];
    while (stk.length > 0) {
      sb.push(stk.pop());
    }

    // 栈中元素插入顺序是反的，需要 reverse 一下
    return sb.reverse().join('');
  };

  console.log('====>>removeDuplicateLetters', removeDuplicateLetters('bcabc'));
}

{
  const removeDuplicateLetters = (s) => {
    // 存放去重的结果
    let stk = [];
    // 布尔数组初始值为 false，记录栈中是否存在某个字符
    // 输入字符均为 ASCII 字符，所以大小 256 够用了
    let inStack = new Array(256).fill(false);

    for (let i = 0; i < s.length; i++) {
      let c = s[i];
      let index = c.charCodeAt();
      // 如果字符 c 存在栈中，直接跳过
      if (inStack[index]) continue;

      // 插入之前，和之前的元素比较一下大小
      // 如果字典序比前面的小，pop 前面的元素
      while (stk.length > 0 && stk[stk.length - 1].charCodeAt() > index) {
        // 弹出栈顶元素，并把该元素标记为不在栈中
        let p = stk.pop();
        inStack[p.charCodeAt()] = false;
      }

      stk.push(c);
      inStack[index] = true;
    }

    let sb = [];
    while (stk.length > 0) {
      sb.push(stk.pop());
    }

    // 栈中元素插入顺序是反的，需要 reverse 一下
    return sb.reverse().join('');
  };

  console.log('====>>removeDuplicateLetters', removeDuplicateLetters('bcabc'));
}

{
  const removeDuplicateLetters = (s) => {
    // 存放去重的结果
    let stk = [];

    // 维护一个计数器记录字符串中字符的数量
    // 因为输入为 ASCII 字符，大小 256 够用了
    let count = new Array(256).fill(0);
    for (let i = 0; i < s.length; i++) {
      count[s[i].charCodeAt()]++;
    }
    // 布尔数组初始值为 false，记录栈中是否存在某个字符
    // 输入字符均为 ASCII 字符，所以大小 256 够用了
    let inStack = new Array(256).fill(false);

    for (let i = 0; i < s.length; i++) {
      let c = s[i];
      let index = c.charCodeAt();
      // 每遍历过一个字符，都将对应的计数减一
      count[index]--;

      // 如果字符 c 存在栈中，直接跳过
      if (inStack[index]) continue;

      // 插入之前，和之前的元素比较一下大小
      // 如果字典序比前面的小，pop 前面的元素
      while (stk.length > 0 && stk[stk.length - 1].charCodeAt() > index) {
        // 若之后不存在栈顶元素了，则停止 pop
        if (count[stk[stk.length - 1].charCodeAt()] == 0) {
          break;
        }
        // 若之后还有，则可以 po
        let p = stk.pop();
        inStack[p.charCodeAt()] = false;
      }

      stk.push(c);
      inStack[index] = true;
    }

    let sb = [];
    while (stk.length > 0) {
      sb.push(stk.pop());
    }

    // 栈中元素插入顺序是反的，需要 reverse 一下
    return sb.reverse().join('');
  };

  console.log('====>>removeDuplicateLetters', removeDuplicateLetters('bcac'));
}

{
  class RandomizedSet {
    constructor() {
      // 存储元素的值
      this.nums = [];
      this.valToIndex = new Map();
    }

    insert(val) {
      // 若 val 已存在，不用再插入
      if (this.valToIndex.has(val)) {
        return false;
      }
      // 若 val 不存在，插入到 nums 尾部，
      // 并记录 val 对应的索引值
      this.valToIndex[val] = this.nums.length;
      this.nums.push(val);
      return true;
    }

    remove(val) {
      // 若 val 不存在，不用再删除
      if (!this.valToIndex.has(val)) {
        return false;
      }
      // 先拿到 val 的索引
      let index = this.valToIndex.get(val);
      // 将最后一个元素对应的索引修改为 index
      this.valToIndex.set(this.nums[this.nums.length - 1], index);
      // 交换 val 和最后一个元素
      let temp = this.nums[index];
      this.nums[index] = this.nums[this.nums.length - 1];
      this.nums[this.nums.length - 1] = temp;
      // 在数组中删除元素 val
      this.nums.pop();
      // 删除元素 val 对应的索引
      this.valToIndex.delete(val);
      return true;
    }

    getRandom() {
      // 随机获取 nums 中的一个元素
      return this.nums[Math.floor(Math.random() * this.nums.length)];
    }
  }
}

{
  const calculate = (s) => {
    const stk = [];
    // 记录算式中的数字
    let num = 0;
    // 记录 num 前的符号，初始化为 +
    let sign = '+';
    for (let i = 0; i < s.length; i++) {
      let c = s[i];
      // 如果是数字，连续读取到 num
      if (Number(c)) num = 10 * num + Number(c);
      // 如果不是数字，就是遇到了下一个符号，
      // 之前的数字和符号就要存进栈中
      if (!Number(c) || i == s.length - 1) {
        switch (sign) {
          case '+':
            stk.push(num);
            break;
          case '-':
            stk.push(-num);
            break;
        }
        // 更新符号为当前符号，数字清零
        sign = c;
        num = 0;
      }
    }
    // 将栈中所有结果求和就是答案
    let res = 0;
    while (stk.length > 0) {
      res += stk[stk.length - 1];
      stk.pop();
    }
    return res;
  };

  console.log('===>calculate', calculate('3+2-1'));
}

{
  const calculate = (s) => {
    const stk = [];
    // 记录算式中的数字
    let num = 0;
    // 记录 num 前的符号，初始化为 +
    let sign = '+';
    for (let i = 0; i < s.length; i++) {
      let c = s[i];
      // 如果是数字，连续读取到 num
      if (Number(c)) num = 10 * num + Number(c);
      // 如果不是数字，就是遇到了下一个符号，
      // 之前的数字和符号就要存进栈中
      if (!Number(c) || i == s.length - 1) {
        let pre;
        switch (sign) {
          case '+':
            stk.push(num);
            break;
          case '-':
            stk.push(-num);
            break;
          // 只要拿出前一个数字做对应运算即可
          case '*':
            pre = stk.pop();
            stk.push(pre * num);
            break;
          case '/':
            pre = stk.pop();
            stk.push(pre / num);
            break;
        }
        // 更新符号为当前符号，数字清零
        sign = c;
        num = 0;
      }
    }
    // 将栈中所有结果求和就是答案
    let res = 0;
    while (stk.length > 0) {
      res += stk[stk.length - 1];
      stk.pop();
    }
    return res;
  };

  console.log('===>calculate', calculate('3+2*2-1'));
}

{
  let arr;
  const calculate = (s) => {
    arr = s.split('');

    return helper(arr);
  };

  const helper = (arr) => {
    const stk = [];
    // 记录算式中的数字
    let num = 0;
    // 记录 num 前的符号，初始化为 +
    let sign = '+';
    while (arr.length >= 0) {
      let c = arr.shift();

      // 如果是数字，连续读取到 num
      if (Number(c)) num = 10 * num + Number(c);

      // 遇到左括号开始递归计算 num
      if (c === '(') {
        num = helper(arr);
        continue;
      }

      if (!Number(c) || arr.length === 0) {
        let pre;
        switch (sign) {
          case '+':
            stk.push(num);
            break;
          case '-':
            stk.push(-num);
            break;
          // 只要拿出前一个数字做对应运算即可
          case '*':
            pre = stk.pop();
            stk.push(pre * num);
            break;
          case '/':
            pre = stk.pop();
            stk.push(pre / num);
            break;
        }
        // 更新符号为当前符号，数字清零
        sign = c;
        num = 0;
      }

      // 遇到右括号返回递归结果
      if (c === ')') {
        break;
      }
    }

    // 将栈中所有结果求和就是答案
    let res = 0;
    while (stk.length > 0) {
      res += stk[stk.length - 1];
      stk.pop();
    }
    return res;
  };

  console.log('===>calculate', calculate('1+(3+2)*2-1'));
}

{
  const calculate = (s) => {
    let arr = s.split(' ').join('').split('');

    const calculateSub = (arr) => {
      let sign = '+';
      let stack = [];
      let num = 0;
      while (arr.length > 0) {
        let c = arr.shift();
        if (!isNaN(Number(c))) {
          num = num * 10 + (c - 0);
        }

        if (c === '(') {
          num = calculateSub(arr);
        }

        if (isNaN(Number(c)) || arr.length === 0) {
          let pre;
          switch (sign) {
            case '+':
              stack.push(num);
              break;
            case '-':
              stack.push(-num);
              break;
            case '*':
              pre = stack.pop();
              stack.push(pre * num);
              break;
            case '/':
              pre = stack.pop();
              stack.push(pre / num);
          }

          sign = c;
          num = 0;
        }

        if (c === ')') {
          break;
        }
      }

      let res = 0;
      while (stack.length > 0) {
        res += stack.pop();
      }

      return res;
    };

    return calculateSub(arr);
  };

  console.log('=====>1', calculate('2- 3*4+ 5'));
  console.log('=====>2', calculate('2 - 3 * 4 + 5'));
  console.log('=====>3', calculate('3*(4-5/2)'));
  console.log('=====>4', calculate('3*((4-2)/2)'));
}
