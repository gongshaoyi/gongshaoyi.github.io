{
  const twoSum = (nums, target) => {
    // 先对数组排序
    nums.sort((a, b) => a - b);
    // 左右指针
    let lo = 0;
    let hi = nums.length - 1;
    while (lo < hi) {
      let sum = nums[lo] + nums[hi];
      // 根据 sum 和 target 的比较，移动左右指针
      if (sum < target) {
        lo++;
      } else if (sum > target) {
        hi--;
      } else if (sum === target) {
        return [nums[lo], nums[hi]];
      }
    }

    return [];
  };

  console.log('====>twoSum', twoSum([5, 3, 1, 6], 9));
}

{
  const twoSumTarget = (nums, target) => {
    // 先对数组排序
    nums.sort((a, b) => a - b);
    let res = [];
    let lo = 0;
    let hi = nums.length - 1;
    while (lo < hi) {
      let sum = nums[lo] + nums[hi];
      // 根据 sum 和 target 的比较，移动左右指针
      if (sum < target) {
        lo++;
      } else if (sum > target) {
        hi--;
      } else {
        res.push([nums[lo], nums[hi]]);
        lo++;
        hi--;
      }
    }

    return res;
  };
}

{
  const twoSumTarget = (nums, target) => {
    // 先对数组排序
    nums.sort((a, b) => a - b);
    let res = [];
    let lo = 0;
    let hi = nums.length - 1;
    while (lo < hi) {
      let sum = nums[lo] + nums[hi];
      // 记录索引 lo 和 hi 最初对应的值
      let left = nums[lo];
      let right = nums[hi];
      // 根据 sum 和 target 的比较，移动左右指针
      if (sum < target) {
        lo++;
      } else if (sum > target) {
        hi--;
      } else {
        res.push([nums[lo], nums[hi]]);
        // 跳过所有重复的元素
        while (lo < hi && nums[lo] === left) {
          lo++;
        }
        while (lo < hi && nums[hi] === right) {
          hi--;
        }
      }
    }

    return res;
  };

  console.log('====>>>>twoSumTarget', twoSumTarget([1, 3, 1, 2, 2, 3], 4));
}

{
  const twoSumTarget = (nums, target) => {
    // 先对数组排序
    nums.sort((a, b) => a - b);
    let res = [];
    let lo = 0;
    let hi = nums.length - 1;
    while (lo < hi) {
      let sum = nums[lo] + nums[hi];
      // 记录索引 lo 和 hi 最初对应的值
      let left = nums[lo];
      let right = nums[hi];
      // 根据 sum 和 target 的比较，移动左右指针
      if (sum < target) {
        while (lo < hi && nums[lo] === left) {
          lo++;
        }
      } else if (sum > target) {
        while (lo < hi && nums[hi] === right) {
          hi--;
        }
      } else {
        res.push([nums[lo], nums[hi]]);
        // 跳过所有重复的元素
        while (lo < hi && nums[lo] === left) {
          lo++;
        }
        while (lo < hi && nums[hi] === right) {
          hi--;
        }
      }
    }

    return res;
  };

  console.log('====>>>>twoSumTarget', twoSumTarget([1, 3, 1, 2, 2, 3], 4));
}

{
  /* 从 nums[start] 开始，计算有序数组
  nums 中所有和为 target 的二元组 */
  const twoSumTarget = (nums, start, target) => {
    // 左指针改为从 start 开始，其他不变
    let lo = start;
    let hi = nums.length - 1;
    let res = [];
    while (lo < hi) {
      let sum = nums[lo] + nums[hi];
      // 记录索引 lo 和 hi 最初对应的值
      let left = nums[lo];
      let right = nums[hi];
      // 根据 sum 和 target 的比较，移动左右指针
      if (sum < target) {
        while (lo < hi && nums[lo] === left) {
          lo++;
        }
      } else if (sum > target) {
        while (lo < hi && nums[hi] === right) {
          hi--;
        }
      } else {
        res.push([nums[lo], nums[hi]]);
        // 跳过所有重复的元素
        while (lo < hi && nums[lo] === left) {
          lo++;
        }
        while (lo < hi && nums[hi] === right) {
          hi--;
        }
      }
    }

    return res;
  };

  /* 计算数组 nums 中所有和为 target 的三元组 */
  const threeSumTarget = (nums, target) => {
    // 数组得排个序
    nums.sort((a, b) => a - b);
    let n = nums.length;
    let res = [];
    // 穷举 threeSum 的第一个数
    for (let i = 0; i < n; i++) {
      // 对 target - nums[i] 计算 twoSum
      let tuples = twoSumTarget(nums, i + 1, target - nums[i]);
      // 如果存在满足条件的二元组，再加上 nums[i] 就是结果三元组
      for (let tuple of tuples) {
        tuple.push(nums[i]);
        res.push(tuple);
      }
      // 跳过第一个数字重复的情况，否则会出现重复结果
      while (i < n - 1 && nums[i] === nums[i + 1]) {
        i++;
      }
    }

    return res;
  };

  console.log(
    '=====>>>threeSumTarget',
    threeSumTarget([-1, 0, 1, 2, -1, -4], 0)
  );
}

{
  const fourSum = (nums, target) => {
    // 数组需要排序
    nums.sort((a, b) => a - b);
    let n = nums.length;
    let res = [];

    // 穷举 fourSum 的第一个数
    for (let i = 0; i < n; i++) {
      // 对 target - nums[i] 计算 threeSum
      let triples = threeSumTarget(nums, i + 1, target - nums[i]);
      // 如果存在满足条件的三元组，再加上 nums[i] 就是结果四元组
      for (let triple of triples) {
        triple.push(nums[i]);
        res.push(triple);
      }
      // fourSum 的第一个数不能重复
      while (i < n - 1 && nums[i] == nums[i + 1]) i++;
    }

    return res;
  };

  const threeSumTarget = (nums, start, target) => {
    let n = nums.length;
    let res = [];
    // 穷举 threeSum 的第一个数
    for (let i = start; i < n; i++) {
      // 对 target - nums[i] 计算 twoSum
      let tuples = twoSumTarget(nums, i + 1, target - nums[i]);
      // 如果存在满足条件的二元组，再加上 nums[i] 就是结果三元组
      for (let tuple of tuples) {
        tuple.push(nums[i]);
        res.push(tuple);
      }
      // 跳过第一个数字重复的情况，否则会出现重复结果
      while (i < n - 1 && nums[i] === nums[i + 1]) {
        i++;
      }
    }

    return res;
  };

  const twoSumTarget = (nums, start, target) => {
    // 左指针改为从 start 开始，其他不变
    let lo = start;
    let hi = nums.length - 1;
    let res = [];
    while (lo < hi) {
      let sum = nums[lo] + nums[hi];
      // 记录索引 lo 和 hi 最初对应的值
      let left = nums[lo];
      let right = nums[hi];
      // 根据 sum 和 target 的比较，移动左右指针
      if (sum < target) {
        while (lo < hi && nums[lo] === left) {
          lo++;
        }
      } else if (sum > target) {
        while (lo < hi && nums[hi] === right) {
          hi--;
        }
      } else {
        res.push([nums[lo], nums[hi]]);
        // 跳过所有重复的元素
        while (lo < hi && nums[lo] === left) {
          lo++;
        }
        while (lo < hi && nums[hi] === right) {
          hi--;
        }
      }
    }

    return res;
  };

  console.log('=====>>>fourSum', fourSum([1, 0, -1, 0, -2, 2], 0));
}

{
  /* 注意：调用这个函数之前一定要先给 nums 排序 */
  const nSumTarget = (nums, n, start, target) => {
    let sz = nums.length;
    let res = [];
    // 至少是 2Sum，且数组大小不应该小于 n
    if (n < 2 || sz < n) return res;

    // 2Sum 是 base case
    if (n === 2) {
      // 双指针那一套操作
      let lo = start;
      let hi = sz - 1;
      while (lo < hi) {
        let sum = nums[lo] + nums[hi];
        let left = nums[lo];
        let right = nums[hi];
        if (sum < target) {
          while (lo < hi && nums[lo] === left) {
            lo++;
          }
        } else if (sum > target) {
          while (lo < hi && nums[hi] === right) {
            hi--;
          }
        } else {
          res.push([left, right]);
          while (lo < hi && nums[lo] === left) {
            lo++;
          }
          while (lo < hi && nums[hi] === right) {
            hi--;
          }
        }
      }
    } else {
      // n > 2 时，递归计算 (n-1)Sum 的结果
      for (let i = start; i < sz; i++) {
        let sub = nSumTarget(nums, n - 1, i + 1, target - nums[i]);
        for (let arr of sub) {
          // (n-1)Sum 加上 nums[i] 就是 nSum
          arr.push(nums[i]);
          res.push(arr);
        }
        while (i < sz - 1 && nums[i] === nums[i + 1]) {
          i++;
        }
      }
    }

    return res;
  };

  const fourSum = (nums, target) => {
    nums.sort((a, b) => a - b);

    // n 为 4，从 nums[0] 开始计算和为 target 的四元组
    return nSumTarget(nums, 4, 0, target);
  };

  console.log('=====>>>fourSum', fourSum([1, 0, -1, 0, -2, 2], 0));
}

{
  const removeCoveredIntervals = (intvs) => {
    // 按照起点升序排列，起点相同时降序排列
    intvs.sort((a, b) => {
      if (a[0] === b[0]) {
        return b[1] - a[1];
      }

      return a[0] - b[0];
    });

    // 记录合并区间的起点和终点
    let left = intvs[0][0];
    let right = intvs[0][1];

    let res = 0;
    for (let i = 1; i < intvs.length; i++) {
      let intv = intvs[i];
      // 情况一，找到覆盖区间
      if (left <= intv[0] && right >= intv[1]) {
        res++;
      }
      // 情况二，找到相交区间，合并
      if (right >= intv[0] && right <= intv[1]) {
        right = intv[1];
      }
      // 情况三，完全不相交，更新起点和终点
      if (right < intv[0]) {
        left = intv[0];
        right = intv[1];
      }
    }

    return intvs.length - res;
  };

  console.log(
    '====>>>removeCoveredIntervals',
    removeCoveredIntervals([
      [1, 4],
      [3, 6],
      [2, 8],
    ])
  );
}

{
  // intervals 形如 [[1,3],[2,6]...]
  const merge = (intervals) => {
    if (intervals.length === 0) return [];
    // 按区间的 start 升序排列
    intervals.sort((a, b) => a[0] - b[0]);

    let res = [];
    res.push(intervals[0]);
    for (let i = 1; i < intervals.length; i++) {
      let curr = intervals[i];
      // res 中最后一个元素的引用
      let last = res[res.length - 1];
      if (curr[0] <= last[1]) {
        // 找到最大的 end
        last[1] = Math.max(last[1], curr[1]);
      } else {
        // 处理下一个待合并区间
        res.push(curr);
      }
    }

    return res;
  };

  console.log(
    '====>>merge',
    merge([
      [1, 4],
      [4, 5],
    ])
  );
}

{
  // A, B 形如 [[0,2],[5,10]...]
  const intervalIntersection = (A, B) => {
    // 双指针
    let i = 0;
    let j = 0;
    let res = [];
    while (i < A.length && j < B.length) {
      let a1 = A[i][0];
      let a2 = A[i][1];
      let b1 = B[j][0];
      let b2 = B[j][1];

      // 两个区间存在交集
      if (b2 >= a1 && a2 >= b1) {
        // 计算出交集，加入 res
        res.push([Math.max(a1, b1), Math.min(a2, b2)]);
      }
      // 指针前进
      if (b2 < a2) {
        j += 1;
      } else {
        i += 1;
      }
    }

    return res;
  };

  console.log(
    '===>>intervalIntersection',
    intervalIntersection(
      [
        [0, 2],
        [5, 10],
        [13, 23],
        [24, 25],
      ],
      [
        [1, 5],
        [8, 12],
        [15, 24],
        [25, 26],
      ]
    )
  );
}

{
  const diffWaysCompute = (input) => {
    let res = [];
    for (let i = 0; i < input.length; i++) {
      let c = input[i];
      // 扫描算式 input 中的运算符
      if (c === '-' || c === '*' || c === '+') {
        /****** 分 ******/
        // 以运算符为中心，分割成两个字符串，分别递归计算
        let left = diffWaysCompute(input.slice(0, i));
        let right = diffWaysCompute(input.slice(i + 1));
        /****** 治 ******/
        // 通过子问题的结果，合成原问题的结果
        for (let a of left) {
          for (let b of right) {
            if (c === '+') {
              res.push(a + b);
            } else if (c === '-') {
              res.push(a - b);
            } else {
              res.push(a * b);
            }
          }
        }
      }
    }
    // base case
    // 如果 res 为空，说明算式是一个数字，没有运算符
    if (res.length === 0) {
      res.push(parseInt(input, 10));
    }

    return res;
  };

  console.log('====>>diffWaysCompute', diffWaysCompute('2*3-4*5'));
}

{
  // 备忘录
  const memo = new Map();
  const diffWaysCompute = (input) => {
    // 避免重复计算
    if (memo.has(input)) {
      return memo.get(input);
    }

    let res = [];
    for (let i = 0; i < input.length; i++) {
      let c = input[i];
      // 扫描算式 input 中的运算符
      if (c === '-' || c === '*' || c === '+') {
        /****** 分 ******/
        // 以运算符为中心，分割成两个字符串，分别递归计算
        let left = diffWaysCompute(input.slice(0, i));
        let right = diffWaysCompute(input.slice(i + 1));
        /****** 治 ******/
        // 通过子问题的结果，合成原问题的结果
        for (let a of left) {
          for (let b of right) {
            if (c === '+') {
              res.push(a + b);
            } else if (c === '-') {
              res.push(a - b);
            } else {
              res.push(a * b);
            }
          }
        }
      }
    }
    // base case
    // 如果 res 为空，说明算式是一个数字，没有运算符
    if (res.length === 0) {
      res.push(parseInt(input, 10));
    }

    // 将结果添加进备忘录
    memo.set(input, res);
    return res;
  };

  console.log('====>>diffWaysCompute', diffWaysCompute('2*3-4*5'));
}

{
  const minMeetingRooms = (meetings) => {
    let n = meetings.length;
    let begin = [];
    let end = [];

    for (let i = 0; i < n; i++) {
      begin[i] = meetings[i][0];
      end[i] = meetings[i][1];
    }
    begin.sort((a, b) => a - b);
    end.sort((a, b) => a - b);

    // 扫描过程中的计数器
    let count = 0;
    // 双指针技巧
    let res = 0;
    let i = 0;
    let j = 0;
    while (i < n && j < n) {
      if (begin[i] < end[j]) {
        // 扫描到一个红点
        count++;
        i++;
      } else {
        // 扫描到一个绿点
        count--;
        j++;
      }
      // 记录扫描过程中的最大值
      res = Math.max(res, count);
    }

    return res;
  };

  console.log(
    '===>>>minMeetingRooms',
    minMeetingRooms([
      [0, 30],
      [5, 10],
      [15, 20],
    ])
  );
}

{
  const videoStitching = (clips, T) => {
    if (T === 0) return 0;
    // 按起点升序排列，起点相同的降序排列
    clips.sort((a, b) => {
      if (a[0] === b[0]) {
        return b[1] - a[1];
      }

      return a[0] - b[0];
    });

    // 记录选择的短视频个数
    let res = 0;
    let curEnd = 0;
    let nextEnd = 0;
    let i = 0;
    let n = clips.length;
    while (i < n && clips[i][0] <= curEnd) {
      // 在第 res 个视频的区间内贪心选择下一个视频
      while (i < n && clips[i][0] <= curEnd) {
        nextEnd = Math.max(nextEnd, clips[i][1]);
        i++;
      }
      // 找到下一个视频，更新 curEnd
      res++;
      curEnd = nextEnd;
      if (curEnd >= T) {
        // 已经可以拼出区间 [0, T]
        return res;
      }
    }
    // 无法连续拼出区间 [0, T]
    return -1;
  };

  console.log(
    '====>>>videoStitching',
    videoStitching(
      [
        [0, 2],
        [4, 6],
        [8, 10],
        [1, 9],
        [1, 5],
        [5, 9],
      ],
      10
    )
  );
}

{
  const isPossible = (nums) => {
    const freq = new Map();
    const need = new Map();

    // 统计 nums 中元素的频率
    for (let i = 0; i < nums.length; i++) {
      let f = freq.get(nums[i]);
      f ? freq.set(nums[i], f + 1) : freq.set(nums[i], 1);
    }

    for (let v of nums) {
      if (freq.get(v) === 0) {
        // 已经被用到其他子序列中
        continue;
      }

      // 先判断 v 是否能接到其他子序列后面
      if (need.has(v) && need.get(v) > 0) {
        // v 可以接到之前的某个序列后面
        freq.set(v, freq.get(v) - 1);
        // 对 v 的需求减一
        need.set(v, need.get(v) - 1);
        // 对 v + 1 的需求加一
        need.set(v + 1, need.has(v + 1) ? need.get(v + 1) + 1 : 1);
      } else if (
        freq.get(v) > 0 &&
        freq.get(v + 1) > 0 &&
        freq.get(v + 2) > 0
      ) {
        // 将 v 作为开头，新建一个长度为 3 的子序列 [v,v+1,v+2]
        freq.set(v, freq.get(v) - 1);
        freq.set(v + 1, freq.get(v + 1) - 1);
        freq.set(v + 2, freq.get(v + 2) - 1);
        // 对 v + 3 的需求加一
        need.set(v + 3, need.has(v + 3) ? need.get(v + 3) + 1 : 1);
      } else {
        // 两种情况都不符合，则无法分配
        return false;
      }
    }

    return true;
  };

  console.log('===>>>>isPossible1', isPossible([1, 2, 3, 3, 4, 4, 5, 5]));
  console.log('===>>>>isPossible2', isPossible([1, 2, 3, 4, 4, 5]));
}

{
  const isPossible = (nums) => {
    const freq = new Map();
    const need = new Map();

    // 统计 nums 中元素的频率
    for (let i = 0; i < nums.length; i++) {
      let f = freq.get(nums[i]);
      f ? freq.set(nums[i], f + 1) : freq.set(nums[i], 1);
    }

    for (let v of nums) {
      if (freq.get(v) === 0) {
        // 已经被用到其他子序列中
        continue;
      }

      // 先判断 v 是否能接到其他子序列后面
      if (need.has(v) && need.get(v).length > 0) {
        // v 可以接到之前的某个序列后面
        freq.set(v, freq.get(v) - 1);
        // 随便取一个需要 v 的子序列
        let seq = need.get(v).pop();
        // 把 v 接到这个子序列后面
        seq.push(v);
        // 这个子序列的需求变成了 v + 1
        need.has(v + 1) ? need.get(v + 1).push(seq) : need.set(v + 1, [seq]);
      } else if (
        freq.get(v) > 0 &&
        freq.get(v + 1) > 0 &&
        freq.get(v + 2) > 0
      ) {
        // 将 v 作为开头，新建一个长度为 3 的子序列 [v,v+1,v+2]
        freq.set(v, freq.get(v) - 1);
        freq.set(v + 1, freq.get(v + 1) - 1);
        freq.set(v + 2, freq.get(v + 2) - 1);
        // 新建一个长度为 3 的子序列 [v,v + 1,v + 2]
        let seq = [v, v + 1, v + 2];
        // 对 v + 3 的需求加一
        need.has(v + 3) ? need.get(v + 3).push(seq) : need.set(v + 3, [seq]);
      } else {
        // 两种情况都不符合，则无法分配
        return false;
      }
    }

    // 打印切分出的所有子序列
    need.forEach((it) => {
      if (it.length > 0) {
        console.log('====>>it', it);
      }
    });
    return true;
  };

  console.log('===>>>>isPossible1', isPossible([1, 2, 3, 3, 4, 4, 5, 5]));
  console.log('===>>>>isPossible2', isPossible([1, 2, 3, 4, 4, 5]));
}

{
  const isRectangleCover = (rectangles) => {
    let X1 = Infinity,
      Y1 = Infinity;
    let X2 = -Infinity,
      Y2 = -Infinity;

    let points = new Set();

    let actual_area = 0;
    for (let cur of rectangles) {
      let [x1, y1, x2, y2] = cur;
      // 计算完美矩形的理论顶点坐标
      X1 = Math.min(X1, x1);
      Y1 = Math.min(Y1, y1);
      X2 = Math.max(X2, x2);
      Y2 = Math.max(Y2, y2);
      // 累加小矩形的面积
      actual_area += (x2 - x1) * (y2 - y1);
      // 记录最终形成的图形中的顶点
      let p1 = [x1, y1];
      let p2 = [x1, y2];
      let p3 = [x2, y1];
      let p4 = [x2, y2];
      for (let p of [p1, p2, p3, p4]) {
        if (points.has(JSON.stringify(p))) {
          points.delete(JSON.stringify(p));
        } else {
          points.add(JSON.stringify(p));
        }
      }
    }
    // 判断面积是否相同
    let expected_area = (X2 - X1) * (Y2 - Y1);
    if (actual_area !== expected_area) {
      return false;
    }
    // 判断最终留下的顶点个数是否为 4
    if (points.size !== 4) return false;
    // 判断留下的 4 个顶点是否是完美矩形的顶点
    if (!points.has(JSON.stringify([X1, Y1]))) return false;
    if (!points.has(JSON.stringify([X1, Y2]))) return false;
    if (!points.has(JSON.stringify([X2, Y1]))) return false;
    if (!points.has(JSON.stringify([X2, Y2]))) return false;

    // 面积和顶点都对应，说明矩形符合题意
    return true;
  };

  console.log(
    '=====>>isRectangleCover',
    isRectangleCover([
      [1, 1, 3, 3],
      [3, 1, 4, 2],
      [3, 2, 4, 4],
      [1, 3, 2, 4],
      [2, 3, 3, 4],
    ])
  );
  console.log(
    '=====>>isRectangleCover',
    isRectangleCover([
      [1, 1, 3, 3],
      [3, 1, 4, 2],
      [1, 3, 2, 4],
      [3, 2, 4, 4],
    ])
  );
}
