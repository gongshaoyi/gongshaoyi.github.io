// 前缀和
// 一维数组中的前缀和
class NumArray {
  // 记录前缀和数组
  preSum = [];
  constructor(num) {
    this.num = num;
    // 初始化前缀和第一项
    this.preSum[0] = 0;
    for (let i = 1; i <= num.length; i++) {
      this.preSum[i] = this.preSum[i - 1] + num[i - 1];
    }
  }
  sumRange(left, right) {
    return this.preSum[right + 1] - this.preSum[left];
  }
}

const NumArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2));
console.log(numArray.sumRange(2, 5));
console.log(numArray.sumRange(0, 5));

// 二维矩阵中的前缀和
class NumMatrix {
  preSum = [];
  constructor(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    if (n === 0 || m === 0) return;
    for (let j = 0; j <= m; j++) {
      let nArr = new Array(n + 1).fill(0);
      this.preSum[j] = nArr;
    }
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j < n; j++) {
        this.preSum[i][j] =
          this.preSum[i - 1][j] +
          this.preSum[i][j - 1] +
          matrix[i - 1][j - 1] -
          this.preSum[i - 1][j - 1];
      }
    }
  }
  sumRegion(x1, y1, x2, y2) {
    return (
      this.preSum[x2 + 1][y2 + 1] -
      this.preSum[x2 + 1][y1] -
      this.preSum[x1][y2 + 1] +
      this.preSum[x1][y1]
    );
  }
  getPreSum() {
    return this.preSum;
  }
}
const numMatrix = new NumMatrix([
  [3, 0, 1, 4],
  [5, 6, 3, 2],
  [1, 2, 0, 1],
  [4, 1, 0, 1],
]);
console.log(numMatrix.getPreSum());
console.log(numMatrix.sumRegion(0, 0, 1, 1));
console.log(numMatrix.sumRegion(0, 0, 1, 2));
console.log(numMatrix.sumRegion(1, 1, 2, 2));

// 和为k的子数组
const subarraySum = (nums, k) => {
  const preSum = [0];
  nums.forEach((element, index) => {
    preSum[index + 1] = preSum[index] + element;
  });
  let res = 0;
  for (let i = 1; i <= nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (preSum[i] - preSum[j] === k) {
        res += 1;
      }
    }
  }
  return res;
};
console.log(subarraySum([1, 1, 1], 2));

const subarraySum2 = (nums, k) => {
  const preSum = new Map();
  preSum.set(0, 1);
  let sum_i = 0;
  let res = 0;
  nums.forEach((value) => {
    sum_i += value;
    let sum_j = sum_i - k;
    if (preSum.has(sum_j)) {
      res += preSum.get(sum_j);
    }
    preSum.has(sum_i)
      ? preSum.set(sum_i, preSum.get(sum_i) + 1)
      : preSum.set(sum_i, 1);
  });
  return res;
};
console.log(subarraySum2([1, 1, 1], 2));

// 差分数组
class Difference {
  diff = [];
  constructor(nums) {
    nums.forEach((value, index) => {
      if (index === 0) {
        this.diff[0] = nums[0];
      } else {
        this.diff[index] = value - nums[index - 1];
      }
    });
  }
  increment(i, j, val) {
    this.diff[i] = this.diff[i] + val;
    if (j + 1 < this.diff.length) {
      this.diff[j + 1] = this.diff[j + 1] - val;
    }
  }
  result() {
    let res = [];
    this.diff.forEach((val, index) => {
      if (index === 0) {
        res[0] = this.diff[0];
      } else {
        res[index] = res[index - 1] + val;
      }
    });
    return res;
  }
}

const df = new Difference([0, 0, 0, 0, 0]);

[
  [1, 3, 2],
  [2, 4, 3],
  [0, 2, -2],
].forEach((item) => {
  df.increment(...item);
});
console.log(df.result());

// 单链表的6大解题套路
// 合并两个有序链表
const mergeTwoList = (l1, l2) => {
  const dummy = {
    value: -1,
    next: null,
  };
  let p = head;
  let p1 = l1;
  let p2 = l2;

  while (p1 !== null && p2 != null) {
    if (p1.value > p2.value) {
      p.next = p2;
      p2 = p2.next;
    } else {
      p.next = p1;
      p1 = p1.next;
    }
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

class PriorityQueue {
  queue = [];
  poll() {
    return this.queue.shift();
  }
  add(node) {
    this.queue.push(node);
    let len = this.queue.length;

    for (let i = len - 1; i > 0; i--) {
      if (this.queue[i].val <= this.queue[i - 1].val) {
        let tmp = this.queue[i].val;
        this.queue[i] = this.queue[i].val;
        this.queue[i].val = tmp;
      } else {
        break;
      }
    }
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}
const mergeKLists = (lists) => {
  const dummy = {
    val: -1,
    next: null,
  };
  let p = dummy;
  const priorityQueue = new PriorityQueue();
  lists.forEach((node) => {
    priorityQueue.add(node[0]);
  });
  while (!priorityQueue.isEmpty) {
    let node = priorityQueue.poll();
    p.next = node;
    if (node.next !== null) {
      priorityQueue.add(node.next);
    }
    p = p.next;
  }

  return dummy.next;
};

// 单链表倒数第k个节点
const findFromEnd = (head, k) => {
  let p1 = head;
  for (let i = 0; i < k; i++) {
    p1 = p1.next;
  }

  let p2 = head;
  while (p1 !== null) {
    p2 = p2.next;
    p1 = p1.next;
  }

  return p2;
};

// 单链表的中点
const middleNode = (head) => {
  let slow = head;
  let fast = head;
  while (slow !== null && fast !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};

// 判断链表是否有环
const hasCycle = (head) => {
  let slow = head;
  let fast = head;
  while (slow !== null && fast !== null) {
    slow = slow.next;
    fast = fast.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
};

// 计算环的起点
const detectCycle = (head) => {
  let slow = head;
  let fast = head;

  while (slow !== null && fast !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (fast === slow) {
      break;
    }
  }

  if (fast == null || fast.next === null) {
    return null;
  }

  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
};

// 判断两个链表是否相交
const getIntersectionNode = (headA, headB) => {
  let p1 = headA;
  let p2 = headB;
  while (p1 !== p2) {
    if (p1 === null) {
      p1 = headB;
    } else {
      p1 = p1.next;
    }

    if (p2 === null) {
      p2 = headA;
    } else {
      p2 = p2.next;
    }
  }

  return p1;
};

// 数组双指针问题
const removeDuplicates = (nums) => {
  let slow = 0;
  let fast = 0;

  while (fast <= nums.length) {
    if (nums[slow] !== nums[fast]) {
      slow++;
      nums[slow] = nums[fast];
    }
    fast++;
  }

  return slow + 1;
};

const deleteDuplicates = (head) => {
  if (head === null) return null;

  let slow = head;
  let fast = head;
  while (fast !== null) {
    if (fast.val !== slow.val) {
      slow.next = fast;
      slow = slow.next;
    }

    fast = fast.next;
  }

  slow.next = null;

  return head;
};

const removeElement = (nums, val) => {
  let slow = 0;
  let fast = 0;

  while (fast <= nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }

  return slow;
};

// 二分查找
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

// 两数之和
const twoSum = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [-1, -1];
};

// 反转数组或字符串
const reverse = (s) => {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }

  return s;
};

// 回文
const isPalindrome = (s) => {
  let left = 0;
  let right = s.length;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};

// 最长回文
const longestPalindrome = (s) => {
  const palindrome = (s, l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }

    return s.slice(l + 1, r);
  };

  let res = '';
  for (let i = 0; i < s.length; i++) {
    let s1 = palindrome(s, i, i);
    let s2 = palindrome(s, i, i + 1);

    res = res.length > s1.length ? res : s1;
    res = res.length > s2.length ? res : s2;
  }

  return res;
};

// 滑动窗口
const minWindow = (s, t) => {
  const need = new Map();
  const window = new Map();
  for (let i = 0; i < t.length; i++) {
    let char = t[i];
    if (!need.get(char)) {
      need.set(char, 1);
    } else {
      need.set(char, need.get(char) + 1);
    }
    window.set(char, 0);
  }
  console.log('====>>need', need);
  console.log('====>>window', window);

  let left = 0;
  let right = 0;
  let valid = 0;

  let start = 0;
  let len = s.length + 1;
  while (right < s.length) {
    let char = s[right];
    right++;
    if (need.has(char)) {
      window.set(char, window.get(char) + 1);
      if (window.get(char) === need.get(char)) {
        valid++;
      }
    }

    while (valid === need.size) {
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      let c = s[left];
      left++;
      if (need.has(c)) {
        if (window.get(c) === need.get(c)) {
          valid--;
        }
        window.set(c, window.get(c) - 1);
      }
    }
  }

  console.log('===>>len', len);
  return len === s.length + 1 ? '' : s.substr(start, len);
};

let S = 'ADOBECODEBANC';
let T = 'ABC';
console.log('=====>result', minWindow(S, T));

//字符串排列
const checkInclusion = (t, s) => {
  const tLen = t.length;
  const sLen = s.length;
  const need = new Map();
  const window = new Map();
  for (let i = 0; i < tLen; i++) {
    let char = t[i];
    if (!need.has(char)) {
      need.set(char, 1);
    } else {
      need.set(char, need.get(char) + 1);
    }
    window.set(char, 0);
  }
  let left = 0;
  let right = 0;
  let valid = 0;

  while (right < sLen) {
    let c = s[right];
    right++;
    if (need.has(c)) {
      window.set(c, window.get(c) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }

    while (right - left >= tLen) {
      if (valid === need.size) {
        return true;
      }
      let d = s[left];
      left++;
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return false;
};
console.log('===>>>1', checkInclusion('ab', 'eidbaooo'));
console.log('===>>>1', checkInclusion('ab', 'eidboaoo'));

// 所以字母异位词
const findAnagrams = (s, t) => {
  const sLen = s.length;
  const tLen = t.length;
  const need = new Map();
  const window = new Map();
  for (let i = 0; i < tLen; i++) {
    let c = t[i];
    if (!need.has(c)) {
      need.set(c, 1);
    } else {
      need.set(c, need.get(c) + 1);
    }
    window.set(c, 0);
  }

  let left = 0;
  let right = 0;
  let valid = 0;
  const res = [];
  while (right < sLen) {
    let d = s[right];
    right++;
    if (need.has(d)) {
      window.set(d, window.get(d) + 1);
      if (window.get(d) === need.get(d)) {
        valid++;
      }
    }

    while (right - left >= tLen) {
      if (valid === need.size) {
        res.push(left);
      }

      let char = s[left];
      left++;
      if (need.has(char)) {
        if (window.get(char) === need.get(char)) {
          valid--;
        }

        window.set(char, window.get(char) - 1);
      }
    }
  }
  return res;
};
console.log('===>findAnagrams', findAnagrams('cbaebabacd', 'abc'));

// 无重复字符字串
const getLengthLongestSubstring = (s) => {
  const len = s.length;
  const window = new Map();
  let left = 0;
  let right = 0;
  let res = 0;
  while (right < len) {
    let c = s[right];
    right++;
    if (window.has(c)) {
      window.set(c, window.get(c) + 1);
    } else {
      window.set(c, 1);
    }

    while (window.get(c) > 1) {
      let d = s[left];
      left++;
      if (window.has(d)) {
        window.set(d, window.get(d) - 1);
      }
    }

    res = Math.max(res, right - left);
  }

  return res;
};
console.log('===>>', getLengthLongestSubstring('abcabcbb'));

// 二分查找
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
console.log('===>1', binarySearch([1, 2, 3, 4], 3));
console.log('===>2', binarySearch([1, 2, 3, 4, 5], 3));
console.log('===>3', binarySearch([1, 2, 3, 4], 5));

// 左侧边界
const left_bound = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      right = mid - 1;
    }
  }

  if (left >= nums.length || nums[left] !== target) {
    return -1;
  }
  return left;
};
console.log('===>>left_bound', left_bound([1, 2, 2, 3, 4], 0));
console.log('===>>left_bound', left_bound([1, 2, 2, 3, 4], 2));
console.log('===>>left_bound', left_bound([1, 2, 2, 3, 4], 1));
console.log('===>>left_bound', left_bound([1, 2, 2, 3, 4], 5));

const right_bound = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      left = mid + 1;
    }
  }

  if (right < 0 || nums[right] !== target) {
    return -1;
  }
  return right;
};
console.log('===>>right_bound', right_bound([1, 2, 2, 3, 4], 0));
console.log('===>>right_bound', right_bound([1, 2, 2, 3, 4], 6));
console.log('===>>right_bound', right_bound([1, 2, 2, 3, 4], 2));
console.log('===>>right_bound', right_bound([1, 2, 2, 3, 4], 1));

const left_bound = (nums, target) => {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > target) {
      right = mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
};
console.log('===>>left_bound', left_bound([1, 2, 2, 3, 4], 0));
console.log('===>>left_bound', left_bound([1, 2, 2, 3, 4], 2));
console.log('===>>left_bound', left_bound([1, 2, 2, 3, 4], 1));
console.log('===>>left_bound', left_bound([1, 2, 2, 3, 4], 5));

// 吃香蕉
const miniEatingSpeed = (piles, h) => {
  const f = (piles, x) => {
    let hours = 0;
    piles.forEach((item) => {
      hours = hours + Math.floor(item / x);
      if (item % x > 0) {
        hours++;
      }
    });

    return hours;
  };

  let left = 1;
  let right = Math.max(...piles);

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (f(piles, mid) > h) {
      left = mid + 1;
    } else if (f(piles, mid) < h) {
      right = mid - 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};
console.log('===>>', miniEatingSpeed([3, 6, 7, 11], 8));

const shipWithinDay = (weight, d) => {
  const f = (x) => {
    let day = 0;
    let len = weight.length;
    // let sum = 0;
    // weight.forEach((item, index) => {
    //   sum = sum + item;
    //   if (sum > x) {
    //     day++;
    //     sum = item;
    //   }
    //   if (index === weight.length - 1 && sum <= x) {
    //     day++;
    //   }
    // });
    for (let i = 0; i < len; ) {
      let cap = x;
      while (i < len) {
        if (cap < weight[i]) {
          break;
        }
        cap -= weight[i];
        i++;
      }
      day++;
    }
    return day;
  };

  let left = Math.max(...weight);
  let right = weight.reduce((pre, item) => {
    return pre + item;
  }, 0);

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (f(mid) > d) {
      left = mid + 1;
    } else if (f(mid) < d) {
      right = mid - 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};

console.log('===>>', shipWithinDay([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));

// 分割数组最大值
const splitArray = (nums, m) => {
  const fn = (x) => {
    let len = nums.length;
    let res = 0;

    for (let i = 0; i < len; ) {
      let max = x;
      while (i < len) {
        if (nums[i] > max) {
          break;
        }
        max -= nums[i];
        i++;
      }
      res++;
    }

    return res;
  };

  let left = Math.max(...nums);
  let right = nums.reduce((pre, item) => pre + item, 0);

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (fn(mid) > m) {
      left = mid + 1;
    } else if (fn(mid) < m) {
      right = mid - 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};
console.log('===>>', splitArray([7, 2, 5, 10, 8], 2));

// 田忌赛马
const advantageCount = (nums1, nums2) => {
  const priorityQueue = nums2.map((item, i) => [i, item]);
  priorityQueue.sort((a, b) => {
    return a[1] - b[1];
  });
  nums1.sort((a, b) => a - b);

  const res = [];
  let left = 0;
  let right = nums1.length - 1;

  while (left <= right) {
    let pair = priorityQueue.pop();
    let maxVal = pair[1];
    let i = pair[0];

    if (maxVal >= nums1[right]) {
      res[i] = nums1[left];
      left++;
    } else {
      res[i] = nums1[right];
      right--;
    }
  }

  return res;
};

console.log(advantageCount([12, 24, 8, 32], [13, 25, 32, 11]));

// 递归反转链表
const reverse = (head) => {
  if (head.next === null) return head;
  const last = reverse(head.next);
  head.next.next = head;
  head.next = null;

  return last;
};

let successor;
const reverseN = (head, n) => {
  if (n === 1) {
    successor = head.next;
    return head;
  }
  const last = reverseN(head.next, n - 1);
  head.next.next === head;
  head.next = successor;

  return last;
};

const reverseBetween = (head, m, n) => {
  if (m === 1) {
    return reverseN(head, n);
  }

  head.next = reverseBetween(head.next, m - 1, n - 1);

  return head;
};

// 括号相关算法题
// 合法括号串
const isValid = (s) => {
  const len = s.length;
  if (len % 2 !== 0) return false;
  const leftOf = (c) => {
    if (c === ')') {
      return '(';
    } else if (c === '}') {
      return '{';
    } else {
      return '[';
    }
  };

  const stack = [];
  for (let i = 0; i < len; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      stack.push(s[i]);
    } else {
      let top = stack.pop();
      if (top !== leftOf(s[i])) {
        return false;
      }
    }
  }

  return stack.length === 0;
};
console.log('==>1', isValid('({[]})'));
console.log('==>2', isValid('({[}])'));

const minAddToMakeVaild = (s) => {
  let need = 0;
  let res = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      need++;
    }

    if (s[i] === ')') {
      need--;
      if (need === -1) {
        res++;
        need = 0;
      }
    }
  }

  return res + need;
};

console.log('=====>1', minAddToMakeVaild('(()(('));
console.log('=====>1', minAddToMakeVaild('())('));

const minInsertions = (s) => {
  let need = 0;
  let res = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      need += 2;
      if (need % 2 === 1) {
        res++;
        need--;
      }
    } else {
      need--;
      if (need === -1) {
        res++;
        need = 1;
      }
    }
  }

  return res + need;
};
console.log('===>>', minInsertions('()(()))'));

// 单调栈
const nextGreaterElement = (nums) => {
  let res = [];
  let stack = [];
  let len = nums.length;

  for (let i = len - 1; i >= 0; i--) {
    while (stack.length !== 0 && stack[stack.length - 1] <= nums[i]) {
      stack.pop();
    }

    res[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
    stack.push(nums[i]);
  }

  return res;
};

console.log('====>', nextGreaterElement([2, 1, 2, 4, 3]));

const getNextGreaterEle = (nums1, nums2) => {
  const greater = nextGreaterElement(nums2);
  const greaterMap = new Map();
  nums2.forEach((item, i) => {
    greaterMap.set(item, greater[i]);
  });

  let res = [];
  nums1.forEach((item) => {
    res.push(greaterMap.get(item));
  });

  return res;
};

const dailyTemperatures = (nums) => {
  const len = nums.length;
  const stack = [];
  const res = [];

  for (let i = len - 1; i >= 0; i--) {
    while (stack.length !== 0 && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }

    res[i] = stack.length === 0 ? 0 : stack[stack.length - 1] - i;
    stack.push(i);
  }

  return res;
};

const greaterEle = (nums) => {
  let n = nums.length;
  let res = [];
  let stack = [];

  for (let i = 2 * n - 1; i >= 0; i--) {
    while (stack.length !== 0 && stack[stack.length - 1] <= nums[i % n]) {
      stack.pop();
    }

    res[i % n] = stack.length === 0 ? -1 : stack[stack.length - 1];
    stack.push(nums[i % n]);
  }

  return res;
};

const maxSlidingWindow = (nums, k) => {
  let window = [];
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if (i < k - 1) {
      window.push(nums[i]);
    } else {
      window.push(nums[i]);
      res.push(Math.max(...window));
      window.shift();
    }
  }

  return res;
};

const removeDuplicateLetters = (s) => {
  const len = s.length;
  const count = {};
  const stack = [];
  const isInStack = {};
  for (let i = 0; i < len; i++) {
    let b = s[i];
    count[b] = count[b] ? count[b] + 1 : 1;
    isInStack[b] = false;
  }

  for (let j = 0; j < len; j++) {
    let c = s[j];
    count[c] = count[c] - 1;
    if (isInStack[c]) continue;

    while (stack.length !== 0 && stack[stack.length - 1] > c) {
      if (count[stack[stack.length - 1]] === 0) {
        break;
      }
      isInStack[stack.pop()] = false;
    }

    stack.push(c);
    isInStack[c] = true;
  }

  return stack;
};

console.log('===>>>1', removeDuplicateLetters('bcabc'));
console.log('===>>>2', removeDuplicateLetters('cbacdcbc'));

class Node {
  next = null;
  prev = null;
  constructor(k, v) {
    this.key = k;
    this.val = v;
  }
}
class DoubleList {
  head = null;
  tail = null;
}

class RandomizedSet {
  nums = [];
  valToIndex = new Map();

  insert(val) {
    if (this.valToIndex.get(val)) {
      return false;
    }
    this.valToIndex[val] = this.nums.length;
    this.nums.push(val);

    return true;
  }

  remove(val) {
    if (!this.valToIndex[val]) {
      return false;
    }

    let index = this.valToIndex.get(val);
    this.valToIndex.set(this.nums[this.nums.length - 1], index);
    let temp = this.nums[index];
    this.nums[index] = this.nums[this.nums.length - 1];
    this.nums[this.nums.length - 1] = temp;
    this.nums.pop();
    this.valToIndex.delete(val);
  }

  getRandom() {
    return this.nums[Math.floor(Math.random() * this.nums.length)];
  }
}

class MedianFinder {
  constructor() {
    this.large = [];
    this.small = [];
  }

  smallAdd(val) {
    for (let i = this.small.length - 1; i >= 0; i--) {
      if (val >= this.small[i]) {
        this.small[i + 1] = val;
      }
      this.small[i + 1] = this.small[i];
    }
  }

  largeAdd(val) {
    for (let i = this.large.length - 1; i >= 0; i--) {
      if (val >= this.large[i]) {
        this.large[i + 1] = val;
      }
      this.large[i + 1] = this.large[i];
    }
  }

  findMedian() {
    if (this.large.length < this.small.length) {
      return this.small[this.small.length - 1];
    } else if (this.large.length > this.small.length) {
      return this.large[this.large.length - 1];
    }
    return (
      (this.large[this.large.length - 1] + this.small[this.small.length - 1]) /
      2
    );
  }

  addNum(num) {
    if (this.small.length >= this.large.length) {
      this.smallAdd(num);
      this.largeAdd(this.small.pop());
    } else {
      this.largeAdd(num);
      this.smallAdd(this.large.pop());
    }
  }
}

const calculateOne = (s) => {
  const stk = [];
  let sign = '+';
  let num = 0;
  for (let i = 0; i < s.length; i++) {
    let c = s[i];

    if (!isNaN(Number(c))) {
      num = num * 10 + (c - 0);
    }

    if (c === '(') {
      let t = s.slice(i + 1);
      num = calculateOne(t);
    }

    if (isNaN(Number(c) || i === s.length - 1)) {
      let pre;

      switch (sign) {
        case '+':
          stk.push(num);
          break;
        case '-':
          stk.push(-num);
          break;
        case '*':
          pre = stk.pop();
          stk.push(pre * num);
          break;
        case '/':
          pre = stk.pop();
          stk.push(pre / num);
          break;
        default:
      }
      sign = c;
      num = 0;
    }

    if (c === ')') {
      break;
    }
  }

  let res = 0;
  while (stk.length > 0) {
    res += stk.pop();
  }

  return res;
};

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

// 二叉树
const maxDepth = (root) => {
  let res = 0;
  let depth = 0;

  const traverse = (root) => {
    if (root === null) {
      res = Math.max(res, depth);
      return;
    }

    depth++;
    traverse(root.left);
    traverse(root.right);
    depth--;
  };

  traverse(root);

  return res;
};

const maxDepth2 = (root) => {
  if (root === null) {
    return 0;
  }

  let leftMax = maxDepth2(root.left);
  let rightMax = maxDepth2(root.right);

  let res = Math.max(leftMax, rightMax) + 1;

  return res;
};

const diameterOfBinaryTree = (root) => {
  let maxDiameter = 0;
  const traverse = (root) => {
    if (root === null) {
      return;
    }

    let leftMax = maxDepth(root.left);
    let rightMax = maxDepth(root.right);
    let myDiameter = leftMax + rightMax;

    maxDiameter = Math.max(maxDiameter, myDiameter);

    traverse(root.left);
    traverse(root.right);
  };

  const maxDepth = (root) => {
    if (root === null) {
      return 0;
    }
    let leftMax = maxDepth(root.left);
    let rightMax = maxDepth(root.right);

    return 1 + Math.max(leftMax, rightMax);
  };

  traverse(root);

  return maxDiameter;
};

const diameterOfBinaryTree2 = (root) => {
  let maxDiameter = 0;

  const maxDepth = (root) => {
    if (root === null) {
      return 0;
    }

    let leftMax = maxDepth(root.left);
    let rightMax = maxDepth(root.right);

    let myDiameter = leftMax + rightMax;
    maxDiameter = Math.max(maxDiameter, myDiameter);

    return 1 + Math.max(leftMax, rightMax);
  };

  maxDepth(root);
  return maxDiameter;
};

const levelTraverse = (root) => {
  if (root === null) return;
  let q = [];
  q.push(root);

  while (q.length > 0) {
    let sz = q.length;

    for (let i = 0; i < sz; i++) {
      let cur = q.shift();
      if (cur.left !== null) {
        q.push(cur.left);
      }
      if (cur.right !== null) {
        q.push(cur.right);
      }
    }
  }
};

const invertTree = (root) => {
  const traverse = (root) => {
    if (root === null) {
      return;
    }

    let temp = root.left;
    root.left = root.right;
    root.right = temp;

    traverse(root.right);
    traverse(root.left);
  };

  traverse(root);
  return root;
};

const invertTree2 = (root) => {
  if (root === null) {
    return null;
  }
  const left = invertTree2(root.left);
  const right = invertTree2(root.right);

  root.left = right;
  root.right = left;

  return root;
};

const connect = (root) => {
  if (root === null) return null;

  const traverse = (node1, node2) => {
    if (node1 === null || node2 === null) {
      return;
    }

    node1.next = node2;

    traverse(node1.left, node1.right);
    traverse(node2.left, node2.right);
    traverse(node1.right, node2.left);
  };

  traverse(root.left, root.right);

  return root;
};

const flatten = (root) => {
  if (root === null) {
    return null;
  }
  const left = flatten(root.left);
  const right = flatten(root.right);
  root.left === null;
  root.right = left;

  let p = root.right;
  while (p.right !== null) {
    p = p.right;
  }
  p.right = right;
};

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
const constructMaxBinaryTree = (arr) => {
  let len = arr.length;
  if (len === 0) {
    return null;
  }

  let maxVal = -9999;
  let index = -1;
  for (let i = 0; i < len; i++) {
    if (maxVal < arr[i]) {
      maxVal = arr[i];
      index = i;
    }
  }

  let root = new TreeNode(maxVal);

  const left = constructMaxBinaryTree(arr.slice(0, index));
  const right = constructMaxBinaryTree(arr.slice(index + 1));

  root.left = left;
  root.right = right;

  return root;
};

console.log(
  '===>constructMaxBinaryTree',
  constructMaxBinaryTree([3, 2, 1, 6, 0, 5])
);

const bulidTree = (preOder, inOrder) => {
  const valToIndex = new Map();
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  for (let i = 0; i < inOrder.length; i++) {
    valToIndex.set(inOrder[i], i);
  }

  const build = (preOder, preStart, preEnd, inOrder, inStart, inEnd) => {
    if (preStart > preEnd) {
      return null;
    }

    let rootVal = preOder[preStart];
    let node = new TreeNode(rootVal);
    let index = valToIndex.get(rootVal);

    let leftSize = index - inStart;
    node.left = build(
      preOder,
      preStart + 1,
      preStart + leftSize,
      inOrder,
      inStart,
      index - 1
    );
    node.right = build(
      preOder,
      preStart + leftSize + 1,
      preEnd,
      inStart,
      index + 1,
      inEnd
    );

    return node;
  };

  return build(preOder, 0, preOder.length - 1, inOrder, 0, inOrder.length - 1);
};
console.log('=====>bulidTree', bulidTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));

const bulidTree2 = (inOrder, postOrder) => {
  const valToIndex = new Map();
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  for (let i = 0; i < inOrder.length; i++) {
    valToIndex.set(inOrder[i], i);
  }

  const build = (inOrder, inStart, inEnd, postOrder, postStart, postEnd) => {
    if (inStart > inEnd) {
      return null;
    }

    let val = postOrder[postEnd];
    const node = new TreeNode(val);
    let index = valToIndex.get(val);

    let leftSize = index - inStart;
    node.left = build(
      inOrder,
      inStart,
      index - 1,
      postOrder,
      postStart,
      postStart + leftSize - 1
    );
    node.right = build(
      inOrder,
      index + 1,
      inEnd,
      postOrder,
      postStart + leftSize,
      postEnd - 1
    );

    return node;
  };

  return build(inOrder, 0, inOrder.length - 1, postOrder, 0, postOrder - 1);
};

const bulidTree3 = (preOder, postOrder) => {
  const valToIndex = new Map();
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.right = null;
      this.left = null;
    }
  }

  for (let i = 0; i < preOder.length; i++) {
    valToIndex.set(postOrder[i], i);
  }

  const build = (preOder, preStart, preEnd, postOrder, postStart, postEnd) => {
    if (preStart > preEnd) {
      return null;
    }
    if (preStart === preEnd) {
      return new TreeNode(preOder[preStart]);
    }

    let val = preOder[preStart];
    const node = new TreeNode(val);
    const leftVal = preOder[preStart + 1];
    let index = valToIndex.get(leftVal);
    let leftSize = index - postStart + 1;

    node.left = build(
      preOder,
      preStart + 1,
      preStart + leftSize,
      postOrder,
      postStart,
      index
    );

    node.right = build(
      preOder,
      preStart + leftSize + 1,
      preEnd,
      postOrder,
      index + 1,
      postEnd - 1
    );

    return node;
  };
};

class CodeCPre {
  serialize(root) {
    const arr = [];

    const serializeTree = (root) => {
      if (root === null) {
        arr.push('#');
        return;
      }

      arr.push(root.val);
      serializeTree(root.left);
      serializeTree(root.right);
    };

    serializeTree(root);

    return arr.join(',');
  }
  deserialize(data) {
    class TreeNode {
      constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
      }
    }
    const arr = data.split(',');

    const deserializeArray = (arr) => {
      if (arr.length === 0) {
        return null;
      }

      let first = arr.shift();
      if (first === '#') return null;
      const root = new TreeNode(first);

      root.left = deserializeArray(arr);
      root.right = deserializeArray(arr);

      return root;
    };

    return deserializeArray(arr);
  }
}

const testCodeC = new CodeCPre();
const tree = testCodeC.deserialize('1,2,#,4,#,#,3,#,#');
console.log('====>>deserialize', tree);
console.log('====>>serialize', testCodeC.serialize(tree));

class CodeCPost {
  serialize(root) {
    if (root === null) return;
    const arr = [];

    const serializeTree = (root) => {
      if (root === null) {
        arr.push('#');
        return;
      }

      serializeTree(root.left);
      serializeTree(root.right);
      arr.push(root.val);
    };

    serializeTree(root);

    return arr.join(',');
  }

  deserialize(data) {
    if (typeof data !== 'string' || data.length === 0) {
      return;
    }
    const arr = data.split(',');

    class TreeNode {
      constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
      }
    }

    const deserializeTree = (arr) => {
      if (arr.length === 0) {
        return null;
      }

      let last = arr.pop();
      if (last === '#') return null;

      const root = new TreeNode(last);
      const right = deserializeTree(arr);
      const left = deserializeTree(arr);

      root.left = left;
      root.right = right;
      return root;
    };

    return deserializeTree(arr);
  }
}

const s = '#,#,#,4,2,#,#,3,1';
const testCodeC2 = new CodeCPost();

const root = testCodeC2.deserialize(s);
console.log('=====>>deserailize', root);
console.log('====>>>serialize', testCodeC2.serialize(root));

class CodeCCc {
  serialize(root) {
    if (root === null) return;
    const arr = [];

    const serializeTree = (root) => {
      const queue = [];
      queue.push(root);

      while (queue.length !== 0) {
        const cur = queue.shift();
        if (cur === null) {
          arr.push('#');
          continue;
        }
        arr.push(cur.val);

        queue.push(cur.left);
        queue.push(cur.right);
      }
    };

    serializeTree(root);
    return arr.join(',');
  }

  deserialize(s) {
    class TreeNode {
      constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
      }
    }
    if (typeof s !== 'string' || s.length === 0) return;
    const arr = s.split(',');
    console.log('===>>arr', arr);
    const queue = [];

    const root = new TreeNode(arr[0]);
    console.log('===>>root', root);
    queue.push(root);
    for (let i = 1; i < arr.length; ) {
      let parent = queue.shift();
      let left = arr[i++];
      if (left !== '#') {
        parent.left = new TreeNode(left);
        queue.push(parent.left);
      } else {
        parent.left = null;
      }

      let right = arr[i++];
      if (right !== '#') {
        parent.right = new TreeNode(right);
        queue.push(parent.right);
      } else {
        parent.right = null;
      }
      console.log('===>>parent', parent, i);
    }

    console.log('===>>root2', root);
    return root;
  }
}

const testCodeCC = new CodeCCc();
const sc = '1,2,3,#,4,#,#,#,#';
const rootc = testCodeCC.deserialize(sc);
console.log('=====>>>deserialize', rootc);
console.log('====>>>serialize', testCodeCC.serialize(rootc));

const findDuplicateSubtrees = (root) => {
  if (root === null) return [];
  const memo = new Map();
  const res = [];

  const traverse = (root) => {
    if (root === null) {
      return '#';
    }

    const left = traverse(root.left);
    const right = traverse(root.right);

    const subTree = `${left},${right},${root.val}`;

    const freq = memo.get(subTree);
    if (freq === 1) {
      res.push(root);
    }

    memo.set(subTree, freq ? freq + 1 : 1);

    return subTree;
  };

  traverse(root);
};

const sort = (nums) => {
  if (!(nums instanceof Array)) return nums;

  const sortItem = (nums) => {
    if (nums.length === 1) return nums;
    let lo = 0;
    let hi = nums.length;
    let mid = Math.floor((lo + hi) / 2);
    let res = [];

    const left = sortItem(nums.slice(lo, mid));
    const right = sortItem(nums.slice(mid));

    let rightLen = right.length;
    let leftLen = left.length;
    let i = 0;
    let j = 0;
    while (i < leftLen && j < rightLen) {
      if (left[i] < right[j]) {
        res.push(left[i++]);
      } else if (left[i] > right[j]) {
        res.push(right[j++]);
      } else {
        res.push(left[i++], right[j++]);
      }
    }

    while (i < leftLen) {
      res.push(left[i++]);
    }

    while (j < rightLen) {
      res.push(right[j++]);
    }

    console.log('====>>>', res);
    return res;
  };

  return sortItem(nums);
};

console.log('=====>>>', sort([3, 2, 4, 1]));

const solution = (nums) => {
  if (!(nums instanceof Array)) return;
  const res = new Array(nums.length).fill(0);
  const pair = {};
  nums.forEach((item, i) => {
    pair[item] = i;
  });

  const solutionItem = (nums) => {
    if (nums.length === 1) return nums;
    let mid = Math.floor(nums.length / 2);
    let merge = [];

    const left = solutionItem(nums.slice(0, mid));
    const right = solutionItem(nums.slice(mid));

    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] > right[j]) {
        for (let k = i; k < left.length; k++) {
          res[pair[left[k]]] += 1;
        }

        merge.push(right[j++]);
      } else if (left[i] < right[j]) {
        merge.push(left[i++]);
      }
    }

    while (i < left.length) {
      merge.push(left[i++]);
    }

    while (j < right.length) {
      merge.push(right[j++]);
    }

    return merge;
  };

  solutionItem(nums);

  return res;
};
console.log('===>>>s', solution([5, 2, 6, 1]));

const kthSmallest = (root, k) => {
  let res = 0;
  let rank = 0;

  const traverse = (root, k) => {
    if (root === null) return;

    traverse(root.left);

    rank++;
    if (rank === k) {
      res = root.val;
      return;
    }

    traverse(root.right);
  };

  traverse(root, k);

  return res;
};

const convertBST = (root) => {
  let sum = 0;

  const traverse = (root) => {
    if (root === null) return;

    traverse(root.right);

    sum += root.val;
    root.val = sum;

    traverse(root.left);
  };

  traverse(root);

  return root;
};

const isInBST = (root, target) => {
  if (root === null) return false;
  if (root.val === target) return true;

  return isInBST(root.left, target) || isInBST(root.right);
};

const isValidBST = (root) => {
  const isValidSubBST = (root, min, max) => {
    if (root === null) return true;

    if (min !== null && root.val <= min) return false;
    if (max !== null && root.val >= max) return false;

    return (
      isValidSubBST(root.left, min, root) &&
      isValidSubBST(root.right, root, max)
    );
  };

  return isValidSubBST(root, null, null);
};

const insertInBST = (root, val) => {
  if (root === null) {
    return new TreeNode(val);
  }

  if (root.val > val) {
    root.left = insertInBST(root.right, val);
  }

  if (root.val < val) {
    root.right = insertInBST(root.right, val);
  }

  return root;
};

const deleteBSTNode = (root, val) => {
  if (root.val === val) {
    // if (root.left === null && root.right === null) {
    //   return null;
    // }
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;

    // if (root.left !== null && root.right !== null) {
    // }
    const getMinNode = (node) => {
      while (node.left !== null) {
        node = node.left;
      }

      return node;
    };
    let minNode = getMinNode(root.right);
    root.val = minNode.val;
    root.right = deleteBSTNode(root.right, minNode.val);
  } else if (root.val > val) {
    root.left = deleteBSTNode(root.left, val);
  } else {
    root.right = deleteBSTNode(root.right, val);
  }

  return root;
};

const numTrees = (n) => {
  const count = (lo, hi) => {
    if (lo > hi) return 1;
    let res = 0;
    for (let i = lo; i <= hi; i++) {
      let left = count(lo, i - 1);
      let right = count(i + 1, hi);

      res += left * right;
    }

    return res;
  };

  return count(1, n);
};

const numTrees2 = (n) => {
  const memo = [];
  for (let i = 0; i <= n; i++) {
    memo[i] = [];
  }

  const count = (lo, hi) => {
    if (lo > hi) return 1;
    let res = 0;

    for (let i = lo; i <= hi; i++) {
      let left = count(lo, i - 1);
      let right = count(i + 1, hi);

      res += left + right;
    }

    memo[lo][hi] = res;

    return res;
  };

  return count(1, n);
};

const generateTrees = (n) => {
  if (n === 0) return [];
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.right = null;
      this.left = null;
    }
  }

  const build = (lo, hi) => {
    let res = [];
    if (lo > hi) {
      res.push(null);
      return res;
    }

    for (let i = lo; i <= hi; i++) {
      const leftTree = build(lo, i - 1);
      const rightTree = build(i + 1, hi);

      const root = new TreeNode(i);

      leftTree.forEach((left) => {
        rightTree.forEach((right) => {
          root.left = left;
          root.right = right;

          res.push(root);
        });
      });
    }

    return res;
  };

  return build(1, n);
};

console.log('====>>', generateTrees(3));

// 二叉搜索树最大键值和
const maxSumBST = () => {
  let maxSum = 0;
  traverse(root);
  const traverse = (root) => {
    if (root === null) {
      return {
        isBST: true,
        min: 0,
        max: 0,
        sum: 0,
      };
    }

    let left = traverse(root.left);
    let right = traverse(root.right);

    let res = {
      isBST: true,
      min: 0,
      max: 0,
      sum: 0,
    };

    if (
      left.isBST &&
      right.isBST &&
      root.val > left.max &&
      root.val < right.min
    ) {
      res.isBST = true;
      res.min = left.min;
      res.max = right.max;
      res.sum = root.val + left.sum + right.sum;
      maxSum = Math.max(res.sum, maxSum);
    } else {
      res.isBST = false;
    }
  };
};

// 快速排序
const quickSort111 = (nums) => {
  let len = nums.length;
  const sort = (nums, lo, hi) => {
    if (lo >= hi) {
      return;
    }
    let p = partition(nums, lo, hi);
    sort(nums, lo, p - 1);
    sort(nums, p + 1, hi);
  };

  const partition = (nums, lo, hi) => {
    const p = nums[lo];

    let i = lo + 1;
    let j = hi;
    while (i < j) {
      while (i < hi && nums[i] <= p) {
        i++;
      }
      while (j > lo && nums[j] >= p) {
        j--;
      }
      if (i >= j) {
        break;
      }

      let t = nums[i];
      nums[i] = nums[j];
      nums[j] = t;
    }

    let t = nums[lo];
    nums[lo] = nums[j];
    nums[j] = t;

    return j;
  };

  sort(nums, 0, len - 1);

  return nums;
};
console.log('====>>quickSort', quickSort111([4, 1, 6, 3, 2, 5]));

const findKthLargest = (nums, k) => {
  let lo = 0;
  let hi = nums.length - 1;
  const partition = (nums, lo, hi) => {
    let p = nums[lo];
    let i = lo + 1;
    let j = hi;
    const swap = (nums, i, j) => {
      let t = nums[i];
      nums[i] = nums[j];
      nums[j] = t;
    };
    while (i <= j) {
      while (i < hi && nums[i] <= p) {
        i++;
      }
      while (j > lo && nums[j] > p) {
        j--;
      }

      if (i >= j) {
        break;
      }
      swap(nums, i, j);
    }
    swap(nums, lo, j);

    return j;
  };

  k = nums.length - k;

  while (lo <= hi) {
    let p = partition(nums, lo, hi);

    if (p > k) {
      hi = p - 1;
    } else if (p < k) {
      lo = p + 1;
    } else {
      return nums[p];
    }
  }
};
console.log('====>>findKthLargest', findKthLargest([4, 1, 6, 3, 2, 5], 4));

const allPathsSourceTarget = (graph) => {
  const res = [];
  let path = [];
  const traverse = (graph, s, path) => {
    path.push(s);
    let n = graph.length - 1;
    if (s === n) {
      res.push([...path]);
      path.pop();
      return;
    }

    for (let i = 0; i < graph[s].length; i++) {
      traverse(graph, graph[s][i], path);
    }

    path.pop();
  };

  traverse(graph, 0, path);

  return res;
};
console.log(
  '===>>>>allPathsSourceTarget',
  allPathsSourceTarget([[1, 2], [3], [3], []])
);

const buildGraph = (numCourses, prerequisetes) => {
  const graph = [];
  for (let i = 0; i < numCourses; i++) {
    graph[i] = [];
  }
  for (let j = 0; j < prerequisetes.length; j++) {
    let from = prerequisetes[j][1];
    let to = prerequisetes[j][0];
    graph[from].push(to);
  }

  return graph;
};

const canFinish = (numCourses, prerequisetes) => {
  let hasCycle = false;
  const graph = buildGraph(numCourses, prerequisetes);
  const visited = new Array(numCourses).fill(false);
  const onPath = new Array(numCourses).fill(false);

  const traverse = (graph, s) => {
    if (onPath[s]) {
      hasCycle = true;
    }

    if (visited[s] || hasCycle) {
      return;
    }
    visited[s] = true;
    onPath[s] = true;

    for (let j = 0; j < graph[s].length; j++) {
      traverse(graph, graph[s][j]);
    }
  };

  for (let i = 0; i < numCourses; i++) {
    traverse(graph, i);
  }

  onPath[s] = false;
};

const findOrder = (numCourses, prerequisetes) => {
  let hasCycle = false;
  const graph = buildGraph(numCourses, prerequisetes);
  const visited = new Array(numCourses).fill(false);
  const onPath = new Array(numCourses).fill(false);
  const postorder = [];

  const traverse = (graph, s) => {
    if (onPath[s]) {
      hasCycle = true;
    }
    if (visited[s] || hasCycle) {
      return;
    }

    onPath[s] = true;
    visited[s] = true;
    if (visited[s] || hasCycle) {
      return;
    }

    for (let j = 0; j < graph[s].length; j++) {
      traverse(graph, graph[s][j]);
    }
    postorder.add[s];
    onPath[s] = false;
  };

  for (let i = 0; i < numCourses; i++) {
    traverse(graph, i);
  }

  if (hasCycle) {
    return [];
  }
  let res = postorder.reverse();

  return res;
};

const canFinish2 = (numCourses, prerequisetes) => {
  const buildGraph = (numCourses, prerequisetes) => {
    const graph = [];
    for (let i = 0; i < numCourses; i++) {
      graph[i] = [];
    }

    for (let j = 0; j < prerequisetes.length; j++) {
      const from = prerequisetes[j][1];
      const to = prerequisetes[j][0];
      graph[from].push(to);
    }

    return graph;
  };

  const graph = buildGraph(numCourses, prerequisetes);

  const indegree = [];
  for (let i = 0; i < prerequisetes.length; i++) {
    let edge = prerequisetes[i];
    let from = edge[1];
    let to = edge[0];
    indegree[to]++;
  }

  let queue = [];
  for (let j = 0; j < numCourses; j++) {
    if (indegree[j] === 0) {
      queue.push(j);
    }
  }

  let count = 0;
  while (queue.length !== 0) {
    let cur = queue.unshift();
    count++;
    for (let k = 0; k < graph[cur].length; k++) {
      let next = graph[cur][k];
      indegree[next]--;
      if (indegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return count === numCourses;
};

const isBipartite = (graph) => {
  let ok = true;
  const n = graph.length;
  const color = new Array(n).fill(false);
  const visited = new Array(n).fill(false);

  const traverse = (graph, v) => {
    if (!ok) {
      return;
    }

    visited[v] = true;
    for (let w of graph[v]) {
      if (!visited[w]) {
        color[w] = !color[v];
        traverse(graph, w);
      } else {
        if (color[v] === color[w]) {
          ok = false;
        }
      }
    }
  };

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      traverse(graph, i);
    }
  }

  return ok;
};

console.log(
  '===>>1111',
  isBipartite([
    [1, 3],
    [0, 2],
    [1, 3],
    [0, 2],
  ])
);
console.log(
  '===>>2222',
  isBipartite([
    [1, 2, 3],
    [0, 2],
    [0, 1, 3],
    [0, 2],
  ])
);

const isBipartite2 = (graph) => {
  let n = graph.length;
  const color = new Array(n).fill(false);
  const visited = new Array(n).fill(false);
  let ok = true;

  const bfs = (graph, v) => {
    const queue = [];
    visited[v] = true;
    queue.push(v);

    while (queue.length > 0 && ok) {
      let cur = queue.shift();
      for (let w of graph[cur]) {
        if (!visited[w]) {
          visited[w] = true;
          color[w] = !color[cur];
          queue.push(w);
        } else {
          if (color[w] === color[cur]) {
            ok = false;
          }
        }
      }
    }
  };

  for (let v = 0; v < n; v++) {
    if (!visited[v]) {
      bfs(graph, v);
    }
  }

  return ok;
};
console.log(
  '===>>1111',
  isBipartite2([
    [1, 3],
    [0, 2],
    [1, 3],
    [0, 2],
  ])
);
console.log(
  '===>>2222',
  isBipartite2([
    [1, 2, 3],
    [0, 2],
    [0, 1, 3],
    [0, 2],
  ])
);

const possibleBipartiton = (n, dislikes) => {
  let ok = true;
  const color = new Array(n + 1).fill(false);
  const visited = new Array(n + 1).fill(false);

  const buildGraph = (n, dislikes) => {
    const graph = [[]];
    for (let i = 1; i <= n; i++) {
      graph[i] = [];
    }

    for (let edge of dislikes) {
      let v = edge[0];
      let w = edge[1];
      graph[v].push(w);
      graph[w].push(v);
    }

    return graph;
  };

  const graph = buildGraph(n, dislikes);

  const traverse = (graph, v) => {
    if (!ok) return;
    visited[v] = true;
    for (let w of graph[v]) {
      if (!visited[w]) {
        color[w] = !color[v];
        traverse(graph, w);
      } else {
        if (color[w] === color[v]) {
          ok = false;
        }
      }
    }
  };

  for (let i = 1; i < n + 1; i++) {
    if (!visited[i]) {
      traverse(graph, i);
    }
  }

  return ok;
};

console.log(
  '===>>4',
  possibleBipartiton(4, [
    [1, 2],
    [1, 3],
    [2, 4],
  ])
);
console.log(
  '===>>3',
  possibleBipartiton(3, [
    [1, 2],
    [1, 3],
    [2, 3],
  ])
);

// union-find
class UF {
  count = 0;
  parent = [];
  constructor(n) {
    this.count = n;
    this.parent = [];
    this.size = [];

    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }

  union(p, q) {
    let rootP = this.find(p);
    let rootQ = this.find(q);

    if (rootP === rootQ) {
      return;
    }

    if (this.size[rootP] > this.size[rootQ]) {
      this.parent[rootQ] = rootP;
      this.size[rootP] += this.size[rootQ];
    } else {
      this.parent[rootP] = rootQ;
      this.size[rootQ] += this.size[rootP];
    }
    this.count -= this.count;
  }

  find(x) {
    while (this.parent[x] !== x) {
      this.parent[x] = this.parent[this.parent[x]];
      x = this.parent[x];
    }
    return x;
  }

  connected(p, q) {
    let rootP = find(p);
    let rootQ = find(q);

    return rootP === rootQ;
  }
}

const countComponets = (n, edges) => {
  const uf = new UF(n);

  for (let edge of edges) {
    uf.union(edge[0], edge[1]);
  }

  return uf.count;
};

const solve = (board) => {
  if (board.length === 0) return;

  const m = board.length;
  const n = board[0].length;

  const uf = new UF(m * n + 1);

  const dummy = m * n;

  for (let i = 0; i < m; i++) {
    if (board[i][0] === 'O') {
      uf.union(i * n, dummy);
    }

    if (board[i][n - 1] === 'O') {
      uf.union(i * n + n - 1, dummy);
    }
  }

  for (let j = 0; j < n; j++) {
    if (board[0][j] === 'O') {
      uf.union(j, dummy);
    }
    if (board[m - 1][j] === 'O') {
      uf.union((m - 1) * n + j, dummy);
    }
  }

  // 方向数组
  const d = [
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
  ];
  for (let i = 1; i < m - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      for (let k = 0; k < 4; k++) {
        let x = i + d[k][0];
        let y = j + d[k][1];
        if (board[x][y] === 'O') {
          uf.union(x * n + y, i * n + j);
        }
      }
    }
  }

  for (let i = 1; i < m - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      if (uf.connected(dummy, i * n + j)) {
        board[i][j] = 'X';
      }
    }
  }
};

const equationsPossible = (equations) => {
  const uf = new UF(26);
  const codeA = 'a'.charCodeAt();

  for (let eq of equations) {
    if (eq[1] === '=') {
      let x = eq[0].charCodeAt();
      let y = eq[3].charCodeAt();
      uf.union(x - codeA, y - codeA);
    }
  }

  for (let eq of equations) {
    if (eq[1] === '!') {
      let x = eq[0].charCodeAt();
      let y = eq[3].charCodeAt();
      if (uf.connected(x - codeA, y - codeA)) {
        return false;
      }
    }
  }

  return tree;
};

const validTree = (n, edges) => {
  const uf = new UF(n);

  for (let edge of edges) {
    let u = edge[0];
    let v = edge[1];

    if (uf.connected(u, v)) {
      return false;
    }

    uf.union(u, v);
  }

  return uf.count === 1;
};

const minimumCost = (n, connections) => {
  const uf = new UF(n + 1);
  connections.sort((a, b) => {
    return a[2] - b[2];
  });
  let mst = 0;

  connections.forEach((edge) => {
    let u = edge[0];
    let v = edge[1];
    let weight = edge[2];

    if (!uf.connected(u, v)) {
      mst += weight;
      uf.union(u, v);
    }
  });

  return uf.count === 2 ? mst : -1;
};

const minCostConnectPoint = (points) => {
  let n = points.length;

  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let xi = points[i][0];
      let yi = points[i][1];
      let xj = points[j][0];
      let yj = points[j][1];

      edges.push([i, j, Math.abs(xi - xj) + Math.abs(yi - yj)]);
    }
  }

  edges.sort((a, b) => {
    return a[2] - b[2];
  });

  let mst = 0;
  const uf = new UF(n);

  edges.forEach((item) => {
    let u = item[0];
    let v = item[1];
    let weight = item[2];

    if (!uf.connected(u, v)) {
      mst += weight;
      uf.union(u, v);
    }
  });

  return mst;
};

class PriorityQueue1 {
  constructor() {
    this.pq = [];
  }
  push(a) {
    this.pq.push(a);
    this.pq.sort((a, b) => {
      return a[2] - b[2];
    });
  }
  shift() {
    return this.pq.shift();
  }
  isEmpty() {
    return this.pq.length === 0;
  }
}
class Prim {
  constructor(graph) {
    this.graph = graph;
    const n = graph.length;
    this.inMST = new Array(n).fill(false);
    this.weightSum = 0;
    this.pq = new PriorityQueue1();
    this.inMST[0] = true;
    this.cut(0);
    while (!this.pq.isEmpty()) {
      let edge = this.pq.shift();
      let to = edge[1];
      let weight = edge[2];
      if (this.inMST[to]) {
        continue;
      }
      this.weightSum += weight;
      this.inMST[to] = true;
      this.cut(to);
    }
  }

  cut(s) {
    for (let edge of this.graph[s]) {
      let to = edge[1];
      if (this.inMST[to]) {
        continue;
      }
      this.pq.push(edge);
    }
  }

  allConnected() {
    return !this.inMST.includes(false);
  }
}

const minimumCost1 = (n, connections) => {
  const buildGraph = (n, connections) => {
    const graph = [];
    for (let i = 0; i < n; i++) {
      graph[i] = [];
    }

    for (let conn of connections) {
      let u = conn[0] - 1;
      let v = conn[1] - 1;
      let weight = conn[2];
      graph[u].push(u, v, weight);
      graph[v].push(v, u, weight);
    }

    return graph;
  };
  const graph = buildGraph(n, connections);

  const prim = new Prim(graph);
  if (!prim.allConnected()) {
    return -1;
  }

  return prim.weightSum;
};

const minCostConnectPoint1 = (points) => {
  let n = points.length;
  const buildGraph = (n, points) => {
    const graph = [];
    for (let i = 0; i < n; i++) {
      graph[i] = [];
    }

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let xi = points[i][0],
          yi = points[i][1];
        let xj = points[j][0],
          yj = points[j][1];
        let weight = Math.abs(xi - xj) + Math.abs(yi - yj);
        graph[i].push(i, j, weight);
        graph[j].push(j, i, weight);
      }
    }

    return;
  };

  const graph = buildGraph(n, points);
  return new Prim(graph).weightSum;
};

class State {
  constructor(id, distFromStart) {
    this.id = id;
    this.distFromStart = distFromStart;
  }
}
const networkDelayTime = (times, n, k) => {
  const dijkstra = (start, graph) => {
    const distTo = new Array(graph.length).fill(Infinity);
    distTo[start] = 0;
    const pq = new PriorityQueue1();
    pq.push(new State(start, 0));

    while (!pq.isEmpty()) {
      let curState = pq.shift();
      let curNodeID = curState.id;
      let curDistFromStart = curState.distFromStart;

      if (curDistFromStart > distTo[curNodeID]) {
        continue;
      }

      for (let neighbor of graph[curNodeID]) {
        let nextNodeID = neighbor[0];
        let distToNextNode = distTo[curNodeID] + neighbor[1];
        if (distTo[nextNodeID] > distToNextNode) {
          distTo[nextNodeID] = distToNextNode;
          pq.push(new State(nextNodeID, distToNextNode));
        }
      }
    }

    return distTo;
  };

  const graph = [];
  for (let i = 0; i <= n; i++) {
    graph[i] = [];
  }
  for (let edge of times) {
    let from = edge[0];
    let to = edge[1];
    let weight = edge[2];
    graph[from].push(to, weight);
  }
  const distTo = dijkstra(k, graph);
  let res = 0;
  for (let i = 1; i < distTo.length; i++) {
    if (distTo[i] === Infinity) {
      return -1;
    }

    return Math.max(res, distTo[i]);
  }

  return res;
};

const minimumEffortPath = (heights) => {
  class State {
    constructor(x, y, effortFromStart) {
      this.x = x;
      this.y = y;
      this.effortFromStart = effortFromStart;
    }
  }
  const adj = (matrix, x, y) => {
    const dirs = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];

    const neighbors = [];
    for (let dir of dirs) {
      let nx = x + dir[0];
      let ny = y + dir[1];
      if (nx >= m || nx < 0 || ny >= n || ny > 0) {
        continue;
      }
      neighbors.push([nx, ny]);
    }

    return neighbors;
  };

  const m = heights.length;
  const n = heights[0].length;
  const effortTo = [];
  for (let i = 0; i < m; i++) {
    effortTo[i] = new Array(n).fill(Infinity);
  }

  effortTo[0][0] = 0;
  const pq = new PriorityQueue1();
  pq.push(new State(0, 0, 0));

  while (!pq.isEmpty()) {
    let curState = pq.shift();
    let curX = curState.x;
    let curY = curState.y;
    let curEffortFromStart = curState.effortFromStart;

    if (curX === m - 1 && curY === n - 1) {
      return curEffortFromStart;
    }

    if (curEffortFromStart > effortTo[curX][curY]) {
      continue;
    }

    for (let neighbor of adj(heights, curX, curY)) {
      let nextX = neighbor[0];
      let nextY = neighbor[1];
      let effortToNextNode = Math.max(
        effortTo[curX][curY],
        Math.abs(heights[curX][curY] - heights[nextX][nextY])
      );

      if (effortTo[nextX][nextY] > effortToNextNode) {
        effortTo[nextX][nextY] = effortToNextNode;
        pq.push(new State(nextX, nextY, effortToNextNode));
      }
    }
  }

  return -1;
};
