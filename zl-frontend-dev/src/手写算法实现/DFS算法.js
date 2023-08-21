//DFS 算法/回溯算法\

// 回溯算法解题套路框架
const traverse = (root) => {
  for (let child of root.childern) {
    // 前序遍历需要的操作
    traverse(child);
    // 后序遍历需要的操作
  }
};

// 主函数，输入一组不重复的数字，返回它们的全排列
const permute = (nums) => {
  // 路径：记录在 track 中
  // 选择列表：nums 中不存在于 track 的那些元素
  // 结束条件：nums 中的元素全都在 track 中出现
  // 回溯函数
  const backtrack = (nums, track) => {
    // 触发结束条件
    if (track.length === nums.length) {
      res.push([...track]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (track.includes(nums[i])) {
        continue;
      }

      track.push(nums[i]);
      backtrack(nums, track);
      track.pop();
    }
  };

  const res = [];
  // 记录「路径」
  const track = [];

  backtrack(nums, track);

  return res;
};

console.log('===>>', permute([1, 2, 3]));
console.log('===>>', permute([4, 2, 3, 8]));

// 输入棋盘边长 n，返回所有合法的放置
const solveNQueens = (n) => {
  // 是否可以在 board[row][col] 放置皇后？
  const isValid = (board, row, col) => {
    // 检查列是否有皇后互相冲突
    for (let i = 0; i < n; i++) {
      if (board[i][col] === 'Q') {
        return false;
      }
    }
    // 检查右上方是否有皇后互相冲突
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }
    // 检查左上方是否有皇后互相冲突
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }
    return true;
  };
  // 路径：board 中小于 row 的那些行都已经成功放置了皇后
  // 选择列表：第 row 行的所有列都是放置皇后的选择
  // 结束条件：row 超过 board 的最后一行
  // 回溯函数
  // const backtrack = (board, row) => {
  //   if (row === board.length) {
  //     // 深拷贝 board 避免后续回溯时被置为原始值
  //     res.push(JSON.parse(JSON.stringify(board)));
  //     return;
  //   }
  //   for (let col = 0; col < n; col++) {
  //     // 排除不合法选择
  //     if (!isValid(board, row, col)) {
  //       continue;
  //     }
  //     // 做选择
  //     board[row][col] = 'Q';
  //     // 进入下一行决策
  //     backtrack(board, row + 1);
  //     // 撤销选择
  //     board[row][col] = '.';
  //   }
  // };

  // 函数找到一个答案后就返回 true
  const backtrack = (board, row) => {
    // 触发结束条件
    if (row === board.length) {
      res.push(JSON.parse(JSON.stringify(board)));
      return true;
    }

    for (let col = 0; col < n; col++) {
      // 排除不合法选择
      if (!isValid(board, row, col)) {
        continue;
      }
      // 做选择
      board[row][col] = 'Q';
      // 进入下一行决策
      if (backtrack(board, row + 1)) {
        return true;
      }
      // 撤销选择
      board[row][col] = '.';
    }

    return false;
  };

  const res = [];
  // '.' 表示空，'Q' 表示皇后，初始化空棋盘。
  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(new Array(n).fill('.'));
  }
  backtrack(board, 0);

  return res;
};

console.log('====>>>solveNQueens1', solveNQueens(1));
console.log('====>>>solveNQueens3', solveNQueens(3));
console.log('====>>>solveNQueens4', solveNQueens(4));

// 回溯算法团灭子集、排列、组合问题

// 主函数
const subsets = (nums) => {
  // 回溯算法核心函数，遍历子集问题的回溯树
  const backtrack = (nums, start) => {
    // 前序位置，每个节点的值都是一个子集
    res.push([...track]);

    // 回溯算法标准框架
    for (let i = start; i < nums.length; i++) {
      // 做选择
      track.push(nums[i]);
      // 通过 start 参数控制树枝的遍历，避免产生重复的子集
      backtrack(nums, i + 1);
      // 撤销选择
      track.pop();
    }
  };

  const res = [];
  // 记录回溯算法的递归路径
  const track = [];

  backtrack(nums, 0);
  return res;
};

console.log('====>>>subsets1', subsets([1, 2]));
console.log('====>>>subsets2', subsets([2, 1, 4]));

const combine = (n, k) => {
  const backtrack = (start, n, k) => {
    // base case
    if (k === track.length) {
      // 遍历到了第 k 层，收集当前节点的值
      res.push([...track]);
      return;
    }

    // 回溯算法标准框架
    for (let i = start; i <= n; i++) {
      // 选择
      track.push(i);
      // 通过 start 参数控制树枝的遍历，避免产生重复的子集
      backtrack(i + 1, n, k);
      // 撤销选择
      track.pop();
    }
  };

  const res = [];
  const track = [];
  backtrack(1, n, k);

  return res;
};

console.log('====>>>combine1', combine(2, 1));
console.log('====>>>combine2', combine(3, 2));

{
  /* 主函数，输入一组不重复的数字，返回它们的全排列 */
  const permute = (nums, k) => {
    // 回溯算法核心函数
    const backtrack = (nums) => {
      if (track.length === k) {
        res.push([...track]);
        return;
      }

      for (let i = 0; i < nums.length; i++) {
        if (used[i]) {
          continue;
        }
        used[i] = true;
        track.push(nums[i]);
        backtrack(nums);
        track.pop();
        used[i] = false;
      }
    };

    const res = [];
    // 记录回溯算法的递归路径
    const track = [];
    // track 中的元素会被标记为 true
    const used = new Array(nums.length).fill(false);
    backtrack(nums);

    return res;
  };

  console.log('====>>>permute', permute([2, 1], 1));
  console.log('====>>>permute', permute([1, 3, 2], 2));
}

const subsetsWithDup = (nums) => {
  const backtrack = (nums, start) => {
    // 前序位置，每个节点的值都是一个子集
    res.push([...track]);
    for (let i = start; i < nums.length; i++) {
      // 剪枝逻辑，值相同的相邻树枝，只遍历第一条
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }
      track.push(nums[i]);
      backtrack(nums, i + 1);
      track.pop();
    }
  };

  const res = [];
  const track = [];
  // 先排序，让相同的元素靠在一起
  nums.sort((a, b) => a - b);
  backtrack(nums, 0);
  return res;
};

console.log('====>>>subsetsWithDup', subsetsWithDup([1, 1]));
console.log('====>>>subsetsWithDup', subsetsWithDup([1, 2, 2]));

{
  const combinationSum = (candidates, target) => {
    // 回溯算法主函数
    const backtrack = (nums, start, target) => {
      // base case，达到目标和，找到符合条件的组合
      if (trackSum === target) {
        res.push([...track]);
        return;
      }

      // base case，超过目标和，直接结束
      if (trackSum > target) {
        return;
      }

      // 回溯算法标准框架
      for (let i = start; i < nums.length; i++) {
        // 剪枝逻辑，值相同的树枝，只遍历第一条
        if (i > start && nums[i] === nums[i - 1]) {
          continue;
        }
        // 做选择
        track.push(nums[i]);
        trackSum += nums[i];
        backtrack(nums, i + 1, target);
        // 撤销选择
        track.pop();
        trackSum -= nums[i];
      }
    };

    const res = [];
    const track = [];
    let trackSum = 0;
    if (candidates.length === 0) {
      return res;
    }
    // 先排序，让相同的元素靠在一起
    candidates.sort((a, b) => a - b);
    backtrack(candidates, 0, target);
    return res;
  };

  console.log('====>>>combinationSum', combinationSum([1, 1, 3], 2));
  console.log('====>>>combinationSum', combinationSum([2, 5, 2, 1, 2], 7));
}

const permuteUnique = (nums) => {
  const backtrack = (nums, track) => {
    if (track.length === n) {
      res.push([...track]);
      return;
    }

    for (let i = 0; i < n; i++) {
      if (used[i]) {
        continue;
      }
      // 新添加的剪枝逻辑，固定相同的元素在排列中的相对位置
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue;
      }
      track.push(nums[i]);
      used[i] = true;
      backtrack(nums, track);
      track.pop();
      used[i] = false;
    }
  };

  const res = [];
  const track = [];
  const n = nums.length;
  const used = new Array(n).fill(false);
  // 先排序，让相同的元素靠在一起
  nums.sort((a, b) => a - b);
  backtrack(nums, track);
  return res;
};

console.log('====>>>permuteUnique', permuteUnique([1, 2, 2]));
console.log('====>>>permuteUnique', permuteUnique([1, 2]));

const combinationSum = (candidates, target) => {
  const backtrack = (nums, start, target) => {
    // base case，找到目标和，记录结果
    if (trackSum === target) {
      res.push([...track]);
    }
    // base case，超过目标和，停止向下遍历
    if (trackSum > target) {
      return;
    }

    for (let i = start; i < nums.length; i++) {
      // 选择 nums[i]
      trackSum += nums[i];
      track.push(nums[i]);
      // 递归遍历下一层回溯树
      // 同一元素可重复使用，注意参数
      backtrack(nums, i, target);
      // 撤销选择 nums[i]
      trackSum -= nums[i];
      track.pop();
    }
  };

  const res = [];
  // 记录回溯的路径
  const track = [];
  // 记录 track 中的路径和
  let trackSum = 0;
  if (candidates.length === 0) {
    return res;
  }
  backtrack(candidates, 0, target);
  return res;
};

console.log('====>>>combinationSum', combinationSum([1, 2, 3], 3));
console.log('====>>>combinationSum', combinationSum([1, 2], 2));

const permuteRepeat = (nums) => {
  const backtrack = (nums) => {
    // base case，到达叶子节点
    if (track.length === nums.length) {
      // 收集叶子节点上的值
      res.push([...track]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 做选择
      track.push(nums[i]);
      // 进入下一层回溯树
      backtrack(nums);
      // 取消选择
      track.pop();
    }
  };
  const res = [];
  const track = [];
  backtrack(nums);
  return res;
};

// console.log('====>>>permuteRepeat', permuteRepeat([1, 2, 3], 3));
console.log('====>>>permuteRepeat', permuteRepeat([1, 2]));

/* 组合/子集问题回溯算法框架 */
const backtrack = (nums, start) => {
  // 回溯算法标准框架
  for (let i = start; i < nums.length; i++) {
    // 做选择
    track.push(nums[i]);
    // 注意参数
    backtrack(nums, i + 1);
    // 撤销选择
    track.pop();
  }
};

/* 排列问题回溯算法框架 */
const backtrack = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    // 剪枝逻辑
    if (used[i]) {
      continue;
    }
    // 做选择
    used[i] = true;
    track.push(nums[i]);

    backtrack(nums);
    // 取消选择
    track.pop();
    used[i] = false;
  }
};

nums.sort((a, b) => a - b);
/* 组合/子集问题回溯算法框架 */
const backtrack = (nums, start) => {
  // 回溯算法标准框架
  for (let i = start; i < nums.length; i++) {
    // 剪枝逻辑，跳过值相同的相邻树枝
    if (i > start && nums[i] == nums[i - 1]) {
      continue;
    }
    // 做选择
    track.push(nums[i]);
    // 注意参数
    backtrack(nums, i + 1);
    // 撤销选择
    track.pop();
  }
};

nums.sort((a, b) => a - b);
/* 排列问题回溯算法框架 */
const backtrack = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    // 剪枝逻辑
    if (used[i]) {
      continue;
    }
    // 剪枝逻辑，固定相同的元素在排列中的相对位置
    if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
      continue;
    }
    // 做选择
    used[i] = true;
    track.push(nums[i]);

    backtrack(nums);
    // 取消选择
    track.pop();
    used[i] = false;
  }
};

/* 组合/子集问题回溯算法框架 */
const backtrack = (nums, start) => {
  // 回溯算法标准框架
  for (let i = start; i < nums.length; i++) {
    // 做选择
    track.push(nums[i]);
    // 注意参数
    backtrack(nums, i);
    // 撤销选择
    track.pop();
  }
};

/* 排列问题回溯算法框架 */
const backtrack = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    // 做选择
    track.push(nums[i]);

    backtrack(nums);
    // 取消选择
    track.pop();
  }
};

for (let index = 0; index < nums.length; index++) {
  console.log(nums[index]);
}

const traverse = (nums, index) => {
  if (index === nums.length) {
    return;
  }
  console.log(nums[index]);
  traverse(nums, index + 1);
};

// k 个桶（集合），记录每个桶装的数字之和
let bucket = [];

// 穷举 nums 中的每个数字
for (let index = 0; index < nums.length; index++) {
  // 穷举每个桶
  for (let i = 0; i < k; i++) {
    // nums[index] 选择是否要进入第 i 个桶
    // ...
  }
}

{
  // k 个桶（集合），记录每个桶装的数字之和
  let bucket = [];
  // 穷举 nums 中的每个数字
  const backtrack = (nums, index) => {
    // base case
    if (index === nums.length) {
      return;
    }
    // 穷举每个桶
    for (let i = 0; i < k; i++) {
      // 选择装进第 i 个桶
      bucket[i] += nums[index];
      // 递归穷举下一个数字的选择
      backtrack(nums, index + 1);
      // 撤销选择
      bucket[i] -= nums[index];
    }
  };
}

{
  // 主函数
  const canPartitionKSubsets = (nums, k) => {
    // 排除一些基本情况
    if (k > nums.length) return false;
    let sum = 0;
    nums.forEach((element) => {
      sum += element;
    });
    if (sum % k !== 0) return false;

    // nums 降序排列
    nums.sort((a, b) => b - a);

    // k 个桶（集合），记录每个桶装的数字之和
    const bucket = new Array(k).fill(0);
    // 理论上每个桶（集合）中数字的和
    const target = sum / k;
    // 穷举，看看 nums 是否能划分成 k 个和为 target 的子集
    return backtrack(nums, 0, bucket, target);
  };

  // 递归穷举 nums 中的每个数字
  const backtrack = (nums, index, bucket, target) => {
    if (index === nums.length) {
      // 检查所有桶的数字之和是否都是 target
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i] !== target) {
          return false;
        }
      }
      // nums 成功平分成 k 个子集
      return true;
    }

    // 穷举 nums[index] 可能装入的桶
    for (let i = 0; i < bucket.length; i++) {
      // 剪枝，桶装装满了
      if (bucket[i] + nums[index] > target) {
        continue;
      }
      // 将 nums[index] 装入 bucket[i]
      bucket[i] += nums[index];
      // 递归穷举下一个数字的选择
      if (backtrack(nums, index + 1, bucket, target)) {
        return true;
      }
      // 撤销选择
      bucket[i] -= nums[index];
    }

    // nums[index] 装入哪个桶都不行
    return false;
  };

  console.log(
    '====>>>canPartitionKSubsets',
    canPartitionKSubsets([1, 2, 3, 4], 2)
  );
}

{
  const canPartitionKSubsets = (nums, k) => {
    // 排除一些基本情况
    if (k > nums.length) return false;
    let sum = 0;
    nums.forEach((element) => {
      sum += element;
    });
    if (sum % k !== 0) return false;

    const used = new Array(nums.length).fill(false);
    const target = sum / k;
    // k 号桶初始什么都没装，从 nums[0] 开始做选择
    return backtrack(k, 0, nums, 0, used, target);
  };

  // 备忘录，存储 used 数组的状态
  const memo = new Map();
  const backtrack = (k, bucket, nums, start, used, target) => {
    // base case
    if (k == 0) {
      // 所有桶都被装满了，而且 nums 一定全部用完了
      // 因为 target == sum / k
      return true;
    }

    // 将 used 的状态转化成形如 [true, false, ...] 的字符串
    // 便于存入 HashMap
    let state = JSON.stringify(used);

    if (bucket === target) {
      // 装满了当前桶，递归穷举下一个桶的选择
      // 让下一个桶从 nums[0] 开始选数字
      let res = backtrack(k - 1, 0, nums, 0, used, target);
      // 将当前状态和结果存入备忘录
      memo.set(state, res);
      return res;
    }

    if (memo.has(state)) {
      // 如果当前状态曾今计算过，就直接返回，不要再递归穷举了
      return memo.get(state);
    }

    // 从 start 开始向后探查有效的 nums[i] 装入当前桶
    for (let i = start; i < nums.length; i++) {
      // 剪枝
      if (used[i]) {
        // nums[i] 已经被装入别的桶中
        continue;
      }
      if (nums[i] + bucket > target) {
        // 当前桶装不下 nums[i]
        continue;
      }
      // 做选择，将 nums[i] 装入当前桶中
      used[i] = true;
      bucket += nums[i];
      // 递归穷举下一个数字是否装入当前桶
      if (backtrack(k, bucket, nums, i + 1, used, target)) {
        return true;
      }
      // 撤销选择
      used[i] = false;
      bucket -= nums[i];
    }
    // 穷举了所有数字，都无法装满当前桶
    return false;
  };

  console.log(
    '====>>>canPartitionKSubsets',
    canPartitionKSubsets([1, 2, 3, 4], 2)
  );
  console.log(
    '====>>>canPartitionKSubsets',
    canPartitionKSubsets([1, 2, 3, 4, 6, 8], 3)
  );
}

{
  const canPartitionKSubsets = (nums, k) => {
    // 排除一些基本情况
    if (k > nums.length) return false;
    let sum = 0;
    nums.forEach((element) => {
      sum += element;
    });
    if (sum % k !== 0) return false;

    let used = 0; // 使用位图技巧
    const target = sum / k;
    // k 号桶初始什么都没装，从 nums[0] 开始做选择
    return backtrack(k, 0, nums, 0, used, target);
  };

  // 备忘录，存储 used 数组的状态
  const memo = new Map();
  const backtrack = (k, bucket, nums, start, used, target) => {
    // base case
    if (k == 0) {
      // 所有桶都被装满了，而且 nums 一定全部用完了
      // 因为 target == sum / k
      return true;
    }

    if (bucket === target) {
      // 装满了当前桶，递归穷举下一个桶的选择
      // 让下一个桶从 nums[0] 开始选数字
      let res = backtrack(k - 1, 0, nums, 0, used, target);
      // 将当前状态和结果存入备忘录
      memo.set(used, res);
      return res;
    }

    if (memo.has(used)) {
      // 如果当前状态曾今计算过，就直接返回，不要再递归穷举了
      return memo.get(used);
    }

    // 从 start 开始向后探查有效的 nums[i] 装入当前桶
    for (let i = start; i < nums.length; i++) {
      // 剪枝
      if (((used >> i) & 1) == 1) {
        // 判断第 i 位是否是 1
        // nums[i] 已经被装入别的桶中
        continue;
      }
      if (nums[i] + bucket > target) {
        // 当前桶装不下 nums[i]
        continue;
      }
      // 做选择，将 nums[i] 装入当前桶中
      used |= 1 << i; // 将第 i 位置为 1
      bucket += nums[i];
      // 递归穷举下一个数字是否装入当前桶
      if (backtrack(k, bucket, nums, i + 1, used, target)) {
        return true;
      }
      // 撤销选择
      used ^= 1 << i; // 使用异或运算将第 i 位恢复 0
      bucket -= nums[i];
    }
    // 穷举了所有数字，都无法装满当前桶
    return false;
  };

  console.log(
    '====>>>canPartitionKSubsets',
    canPartitionKSubsets([1, 2, 3, 4], 2)
  );
  console.log(
    '====>>>canPartitionKSubsets',
    canPartitionKSubsets([1, 2, 3, 4, 6, 8], 3)
  );
}

{
  // 二叉树遍历框架
  const traverse = (root) => {
    traverse(root.left);
    traverse(root.right);
  };

  // 二维矩阵遍历框架
  const dfs = (grid, i, j, visited) => {
    let m = grid.length;
    let n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n) {
      // 超出索引边界
      return;
    }
    if (visited[i][j]) {
      // 已遍历过 (i, j)
      return;
    }
    // 前序：进入节点 (i, j)
    visited[i][j] = true;
    dfs(grid, i - 1, j); // 上
    dfs(grid, i + 1, j); // 下
    dfs(grid, i, j - 1); // 左
    dfs(grid, i, j + 1); // 右
    // 后序：离开节点 (i, j)
    visited[i][j] = false;
  };
}
{
  // 方向数组，分别代表上、下、左、右
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const dfs = (grid, i, j, visited) => {
    let m = grid.length;
    let n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n) {
      // 超出索引边界
      return;
    }
    if (visited[i][j]) {
      // 已遍历过 (i, j)
      return;
    }
    // 前序：进入节点 (i, j)
    visited[i][j] = true;
    // 递归遍历上下左右的节点
    dirs.forEach((d) => {
      let next_i = i + d[0];
      let next_j = j + d[1];
      dfs(grid, next_i, next_j);
    });
    // 后序：离开节点 (i, j)
    visited[i][j] = false;
  };
}

{
  // 主函数，计算岛屿数量
  const numIsLands = (grid) => {
    let res = 0;
    let m = grid.length;
    let n = grid[0].length;
    // 遍历 grid
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 1) {
          // 每发现一个岛屿，岛屿数量加一
          res++;
          // 然后使用 DFS 将岛屿淹了
          dfs(grid, i, j);
        }
      }
    }
    return res;
  };

  // 从 (i, j) 开始，将与之相邻的陆地都变成海水
  const dfs = (grid, i, j) => {
    let m = grid.length;
    let n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n) {
      // 超出索引边界
      return;
    }
    if (grid[i][j] === 0) {
      // 已经是海水了
      return;
    }

    // 将 (i, j) 变成海水
    grid[i][j] = 0;
    // 淹没上下左右的陆地
    dfs(grid, i + 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i - 1, j);
    dfs(grid, i, j - 1);
  };

  console.log(
    '====>>>numIsLands',
    numIsLands([
      [1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1],
    ])
  );
}

{
  const closedIsLand = (grid) => {
    let m = grid.length;
    let n = grid[0].length;
    let res = 0;
    for (let j = 0; j < n; j++) {
      // 把靠上边的岛屿淹掉
      dfs(grid, 0, j);
      // 把靠下边的岛屿淹掉
      dfs(grid, m - 1, j);
    }
    for (let i = 0; i < m; i++) {
      // 把靠左边的岛屿淹掉
      dfs(grid, i, 0);
      // 把靠右边的岛屿淹掉
      dfs(grid, i, n - 1);
    }
    // 遍历 grid，剩下的岛屿都是封闭岛屿
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 0) {
          // 每发现一个岛屿，岛屿数量加一
          res++;
          // 然后使用 DFS 将岛屿淹了
          dfs(grid, i, j);
        }
      }
    }
    return res;
  };

  // 从 (i, j) 开始，将与之相邻的陆地都变成海水
  const dfs = (grid, i, j) => {
    let m = grid.length;
    let n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n) {
      // 超出索引边界
      return;
    }
    if (grid[i][j] === 1) {
      // 已经是海水了
      return;
    }
    // 将 (i, j) 变成海水
    grid[i][j] = 1;
    // 淹没上下左右的陆地
    dfs(grid, i + 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i - 1, j);
    dfs(grid, i, j - 1);
  };

  console.log(
    '====>>>closedIsLand',
    closedIsLand([
      [1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1],
    ])
  );
  console.log(
    '====>>>closedIsLand',
    closedIsLand([
      [1, 1, 0, 1, 1],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
    ])
  );
}

{
  const closedIsLand = (grid) => {
    let m = grid.length;
    let n = grid[0].length;
    let res = 0;
    for (let j = 0; j < n; j++) {
      // 把靠上边的岛屿淹掉
      dfs(grid, 0, j);
      // 把靠下边的岛屿淹掉
      dfs(grid, m - 1, j);
    }
    for (let i = 0; i < m; i++) {
      // 把靠左边的岛屿淹掉
      dfs(grid, i, 0);
      // 把靠右边的岛屿淹掉
      dfs(grid, i, n - 1);
    }
    // 遍历 grid，剩下的岛屿都是封闭岛屿
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 0) {
          // 每发现一个岛屿，岛屿数量加一
          res += 1;
        }
      }
    }
    return res;
  };

  // 从 (i, j) 开始，将与之相邻的陆地都变成海水
  const dfs = (grid, i, j) => {
    let m = grid.length;
    let n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n) {
      // 超出索引边界
      return;
    }
    if (grid[i][j] === 1) {
      // 已经是海水了
      return;
    }
    // 将 (i, j) 变成海水
    grid[i][j] = 1;
    // 淹没上下左右的陆地
    dfs(grid, i + 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i - 1, j);
    dfs(grid, i, j - 1);
  };

  console.log(
    '====>>>closedIsLand',
    closedIsLand([
      [1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1],
    ])
  );
  console.log(
    '====>>>closedIsLand',
    closedIsLand([
      [1, 1, 0, 1, 1],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
    ])
  );
}

{
  const maxAreaOfIsland = (grid) => {
    // 记录岛屿的最大面积
    let res = 0;
    let m = grid.length;
    let n = grid[0].length;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 1) {
          // 淹没岛屿，并更新最大岛屿面积
          res = Math.max(res, dfs(grid, i, j));
        }
      }
    }

    return res;
  };

  // 淹没与 (i, j) 相邻的陆地，并返回淹没的陆地面积
  const dfs = (grid, i, j) => {
    let m = grid.length;
    let n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n) {
      // 超出索引边界
      return 0;
    }
    if (grid[i][j] === 0) {
      // 已经是海水了
      return 0;
    }
    // 将 (i, j) 变成海水
    grid[i][j] = 0;

    return (
      dfs(grid, i + 1, j) +
      dfs(grid, i, j + 1) +
      dfs(grid, i - 1, j) +
      dfs(grid, i, j - 1) +
      1
    );
  };

  console.log(
    '===>maxAreaOfIsland',
    maxAreaOfIsland([
      [1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1],
      [1, 1, 0, 1, 1],
    ])
  );
}

{
  const countSubIslands = (grid1, grid2) => {
    let m = grid1.length;
    let n = grid1[0].length;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid1[i][j] === 0 && grid2[i][j] === 1) {
          // 这个岛屿肯定不是子岛，淹掉
          dfs(grid2, i, j);
        }
      }
    }
    // 现在 grid2 中剩下的岛屿都是子岛，计算岛屿数量
    let res = 0;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid2[i][j] === 1) {
          res++;
          dfs(grid2, i, j);
        }
      }
    }
    return res;
  };

  // 从 (i, j) 开始，将与之相邻的陆地都变成海水
  const dfs = (grid, i, j) => {
    let m = grid.length;
    let n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n) {
      // 超出索引边界
      return;
    }
    if (grid[i][j] == 0) {
      return;
    }

    grid[i][j] = 0;

    // 递归顺序：
    dfs(grid, i + 1, j); // 上
    dfs(grid, i, j + 1); // 下
    dfs(grid, i - 1, j); // 左
    dfs(grid, i, j - 1); // 右
  };

  console.log(
    '===>>>countSubIslands',
    countSubIslands(
      [
        [1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 0, 1, 1],
      ],
      [
        [1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
        [0, 1, 0, 0, 0],
        [1, 0, 1, 1, 0],
        [0, 1, 0, 1, 1],
      ]
    )
  );
}

{
  const dfs = (grid, i, j, sb, dir) => {
    let m = grid.length;
    let n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === 0) {
      // 超出索引边界
      return;
    }
    // 前序遍历位置：进入 (i, j)
    grid[i][j] = 0;
    sb.push(dir);

    // 递归顺序：
    dfs(grid, i + 1, j, sb, 1); // 上
    dfs(grid, i - 1, j, sb, 2); // 上
    dfs(grid, i, j - 1, sb, 3); // 左
    dfs(grid, i, j + 1, sb, 4); // 右

    // 后序遍历位置：离开 (i, j)
    sb.push(-dir);
  };

  const numDistinctIslands = (grid) => {
    let m = grid.length;
    let n = grid[0].length;
    // 记录所有岛屿的序列化结果
    const isLands = new Set();
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 1) {
          // 淹掉这个岛屿，同时存储岛屿的序列化结果
          const sb = [];
          // 初始的方向可以随便写，不影响正确性
          dfs(grid, i, j, sb, 666);
          isLands.add(JSON.stringify(sb));
        }
      }
    }

    // 不相同的岛屿数量
    return isLands.size;
  };

  console.log(
    '===>>numDistinctIslands',
    numDistinctIslands([
      [1, 1, 0, 1, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1],
    ])
  );
}

{
  const foo = (function () {
    let v = 0;
    return () => v++;
  })();

  for (let i = 0; i < 10; i++) {
    foo();
  }

  console.log('==>>foo()', foo());
}
