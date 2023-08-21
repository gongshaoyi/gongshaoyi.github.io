/* eslint-disable no-unreachable */
{
  const fib = (N) => {
    if (N === 1 || N === 2) return 1;
    return fib(N - 1) + fib(N - 2);
  };
}
{
  const fib = (N) => {
    if (N < 1) return 0;
    // 备忘录全初始化为 0
    const memo = new Array(N + 1).fill(0);
    // 初始化最简情况
    return helper(memo, N);
  };

  const helper = (memo, n) => {
    // base case
    if (n === 1 || n === 2) return 1;
    // 已经计算过
    if (memo[n] !== 0) return memo[n];
    memo[n] = helper(memo, n - 1) + helper(memo, n - 2);

    return memo[n];
  };

  console.log('====>>>fib', fib(3));
  console.log('====>>>fib', fib(5));
}

{
  const fib = (N) => {
    const dp = new Array(N + 1).fill(0);
    // base case
    dp[1] = dp[2] = 1;
    for (let i = 3; i <= N; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[N];
  };

  console.log('====>>>fib', fib(3));
  console.log('====>>>fib', fib(5));
}

{
  const fib = (n) => {
    if (n === 2 || n === 1) return 1;
    let pre = 1,
      cur = 1;

    for (let i = 3; i <= n; i++) {
      let sum = pre + cur;
      pre = cur;
      cur = sum;
    }

    return cur;
  };

  console.log('====>>>fib', fib(3));
  console.log('====>>>fib', fib(5));
}

{
  const coinChange = (coins, amount) => {
    // # base case
    if (amount === 0) return 0;
    if (amount < 0) return -1;
    // # 求最小值，所以初始化为正无穷
    let res = Infinity;

    for (let coin of coins) {
      let subproblem = coinChange(coins, amount - coin);
      // # 子问题无解，跳过
      if (subproblem === -1) {
        continue;
      }

      res = Math.min(res, 1 + subproblem);
    }

    return res === Infinity ? -1 : res;
  };

  console.log('====>>>coinChange', coinChange([1, 2, 5], 11));
  // console.log('====>>>coinChange', coinChange([1, 2, 5],3));
}

{
  const coinChange = (coins, amount) => {
    const memo = new Map();

    return dp(coins, amount, memo);
  };

  const dp = (coins, amount, memo) => {
    // # 查备忘录，避免重复计算
    if (memo.has(amount)) return memo.get(amount);

    // # base case
    if (amount === 0) return 0;
    if (amount < 0) return -1;
    // # 求最小值，所以初始化为正无穷
    let res = Infinity;

    for (let coin of coins) {
      let subproblem = dp(coins, amount - coin, memo);
      // # 子问题无解，跳过
      if (subproblem === -1) {
        continue;
      }

      res = Math.min(res, 1 + subproblem);
      if (res !== Infinity) {
        memo.set(amount, res);
      }
    }

    return res === Infinity ? -1 : res;
  };

  console.log('====>>>coinChange', coinChange([1, 2, 5], 11));
  console.log('====>>>coinChange', coinChange([1, 2, 5], 3));
}

{
  const coinChange = (coins, amount) => {
    // 数组大小为 amount + 1，初始值也为 amount + 1
    const dp = new Array(amount + 1).fill(amount + 1);
    // base case
    dp[0] = 0;
    for (let i = 0; i < dp.length; i++) {
      // 内层 for 在求所有子问题 + 1 的最小值
      for (let coin of coins) {
        // 子问题无解，跳过
        if (i - coin < 0) continue;
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }

    return dp[amount] === amount + 1 ? -1 : dp[amount];
  };

  console.log('====>>>coinChange', coinChange([1, 2, 5], 11));
  console.log('====>>>coinChange', coinChange([1, 2, 5], 3));
}

{
  const minFallingPathSum = (matrix) => {
    let n = matrix.length;
    let res = Infinity;

    // 终点可能在最后一行的任意一列
    for (let j = 0; j < n; j++) {
      res = Math.min(res, dp(matrix, n - 1, j));
    }

    return res;
  };

  const dp = (matrix, i, j) => {
    // 非法索引检查
    if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[0].length) {
      // 返回一个特殊值
      return Infinity;
    }

    // base case
    if (i == 0) {
      return matrix[i][j];
    }
    // 状态转移
    return (
      matrix[i][j] +
      Math.min(
        dp(matrix, i - 1, j),
        dp(matrix, i - 1, j - 1),
        dp(matrix, i - 1, j + 1)
      )
    );
  };
}

{
  // 备忘录里的值初始化为 无穷
  const memo = [];
  const minFallingPathSum = (matrix) => {
    let n = matrix.length;
    let res = Infinity;

    for (let i = 0; i < n; i++) {
      memo[i] = new Array(n).fill(Infinity);
    }

    // 终点可能在最后一行的任意一列
    for (let j = 0; j < n; j++) {
      res = Math.min(res, dp(matrix, n - 1, j));
    }

    return res;
  };

  const dp = (matrix, i, j) => {
    // 非法索引检查
    if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[0].length) {
      // 返回一个特殊值
      return Infinity;
    }

    // base case
    if (i == 0) {
      return matrix[i][j];
    }
    // 查找备忘录，防止重复计算
    if (memo[i][j] !== Infinity) return memo[i][j];
    // 状态转移
    memo[i][j] =
      matrix[i][j] +
      Math.min(
        dp(matrix, i - 1, j),
        dp(matrix, i - 1, j - 1),
        dp(matrix, i - 1, j + 1)
      );
    return memo[i][j];
  };

  console.log(
    '====>>>>minFallingPathSum',
    minFallingPathSum([
      [2, 1, 3],
      [6, 5, 4],
      [7, 8, 9],
    ])
  );
}

{
  const lengthOfLIS = (nums) => {
    // 定义：dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度
    // base case：dp 数组全都初始化为 1
    const dp = new Array(nums.length).fill(1);
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
    }

    let res = 0;
    dp.forEach((item) => {
      res = Math.max(res, item);
    });
    return res;
  };

  console.log('====>>>lengthOfLIS', lengthOfLIS([1, 4, 3, 4, 2, 3]));
}

{
  const lengthOfLIS = (nums) => {
    const top = [];
    // 牌堆数初始化为 0
    let piles = 0;
    for (let i = 0; i < nums.length; i++) {
      // 要处理的扑克牌
      let poker = nums[i];
      /***** 搜索左侧边界的二分查找 *****/
      let left = 0,
        right = piles;
      while (left < right) {
        let mid = (left + right) / 2;
        if (top[mid] > poker) {
          right = mid;
        } else if (top[mid] < poker) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      /*********************************/

      // 没找到合适的牌堆，新建一堆
      if (left == piles) piles++;
      // 把这张牌放到牌堆顶
      top[left] = poker;
    }
    // 牌堆数就是 LIS 长度
    return piles;
  };

  console.log('====>>>lengthOfLIS', lengthOfLIS([1, 4, 3, 4, 2, 3]));
}

{
  // envelopes = [[w, h], [w, h]...]
  const maxEnvelopes = (envelops) => {
    let n = envelops.length;
    // 按宽度升序排列，如果宽度一样，则按高度降序排列
    envelops.sort((a, b) => {
      if (a[0] !== b[0]) {
        return a[0] - b[0];
      } else {
        return b[1] - a[1];
      }
    });
    // 对高度数组寻找 LIS
    let height = [];
    for (let i = 0; i < n; i++) {
      height[i] = envelops[i][1];
    }

    return lengthOfLIS(height);
  };

  const lengthOfLIS = (nums) => {
    // 定义：dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度
    // base case：dp 数组全都初始化为 1
    const dp = new Array(nums.length).fill(1);
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
    }

    let res = 0;
    dp.forEach((item) => {
      res = Math.max(res, item);
    });
    return res;
  };

  console.log(
    '=====>>maxEnvelopes',
    maxEnvelopes([
      [5, 4],
      [6, 4],
      [6, 7],
      [2, 3],
    ])
  );
}

{
  const maxSubArray = (nums) => {
    let n = nums.length;
    if (n === 0) return 0;
    // 定义：dp[i] 记录以 nums[i] 为结尾的「最大子数组和」
    const dp = [];
    // base case
    // 第一个元素前面没有子数组
    dp[0] = nums[0];
    // 状态转移方程
    for (let i = 1; i < n; i++) {
      dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
    }
    // 得到 nums 的最大子数组
    let res = -Infinity;
    for (let i = 0; i < n; i++) {
      res = Math.max(res, dp[i]);
    }
    return res;
  };

  console.log('====>>>maxSubArray', maxSubArray([-3, 1, 3, -1, 2, -4, 2]));
}
{
  const maxSubArray = (nums) => {
    let n = nums.length;
    if (n === 0) return 0;
    // base case
    let dp_0 = nums[0];
    let dp_1 = 0,
      res = dp_0;
    // 状态转移方程
    for (let i = 1; i < n; i++) {
      dp_1 = Math.max(nums[i], nums[i] + dp_0);
      dp_0 = dp_1;
      // 顺便计算最大的结果
      res = Math.max(res, dp_1);
    }

    return res;
  };

  console.log('====>>>maxSubArray', maxSubArray([-3, 1, 3, -1, 2, -4, 2]));
}

{
  // 前缀和技巧解题
  const maxSubArray = (nums) => {
    let n = nums.length;
    const preSum = [];
    preSum[0] = 0;
    // 构造 nums 的前缀和数组
    for (let i = 1; i <= n; i++) {
      preSum[i] = preSum[i - 1] + nums[i - 1];
    }

    let res = -Infinity;
    let minVal = Infinity;
    for (let i = 0; i < n; i++) {
      // 维护 minVal 是 preSum[0..i] 的最小值
      minVal = Math.min(minVal, preSum[i]);
      // 以 nums[i] 结尾的最大子数组和就是 preSum[i+1] - min(preSum[0..i])
      res = Math.max(res, preSum[i + 1] - minVal);
    }
    return res;
  };

  console.log('====>>>maxSubArray', maxSubArray([-3, 1, 3, -1, 2, -4, 2]));
}

{
  const minDistance = (s1, s2) => {
    // i，j 初始化，指向最后一个索引
    return dp(s1.length - 1, s2.length - 2);
  };

  const dp = (i, j) => {
    // base case
    if (i === -1) return j + 1;
    if (j === -1) return i + 1;
    if (s1[i] == s2[j]) {
      // 啥都不做
      return dp(i - 1, j - 1);
    } else {
      return Math.min(
        dp(i, j - 1) + 1, // 插入
        dp(i - 1, j) + 1, // 删除
        dp(i - 1, j - 1) + 1 // 替换
      );
    }
  };
}
{
  if (s1[i] == s2[j]) {
    // 啥都不做
    return dp(i - 1, j - 1);
  }
  // # 解释：
  // # 本来就相等，不需要任何操作
  // # s1[0..i] 和 s2[0..j] 的最小编辑距离等于
  // # s1[0..i-1] 和 s2[0..j-1] 的最小编辑距离
  // # 也就是说 dp(i, j) 等于 dp(i-1, j-1)
}

{
  const minDistance = (s1, s2) => {
    let m = s1.length;
    let n = s2.length;
    const dp = [];

    // base case
    for (let i = 0; i <= m; i++) {
      dp[i] = [i];
    }
    for (let j = 1; j <= n; j++) {
      dp[0][j] = j;
    }
    // 自底向上求解
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i][j - 1] + 1, // 插入
            dp[i - 1][j] + 1, // 删除
            dp[i - 1][j - 1] + 1 // 替换
          );
        }
      }
    }
    // 存储着整个s1和s2的最小距离
    return dp[m][n];
  };

  console.log('====>>>minDistance', minDistance('horse', 'ros'));
}

{
  // 定义：计算 s1[i..] 和 s2[j..] 的最长公共子序列长度
  const dp = (s1, i, s2, j) => {
    if (s1[i] == s2[j]) {
      return 1 + dp(s1, i + 1, s2, j + 1);
    } else {
      // s1[i] 和 s2[j] 中至少有一个字符不在 lcs 中，
      // 穷举三种情况的结果，取其中的最大结果
      return Math.max(
        // 情况一、s1[i] 不在 lcs 中
        dp(s1, i + 1, s2, j),
        // 情况二、s2[j] 不在 lcs 中
        dp(s1, i, s2, j + 1),
        // 情况三、都不在 lcs 中
        dp(s1, i + 1, s2, j + 1)
      );
    }
  };
}

{
  const memo = [];

  /* 主函数 */
  const longestCommonSubsequence = (s1, s2) => {
    let m = s1.length,
      n = s2.length;
    // 备忘录值为 -1 代表未曾计算
    for (let k = 0; k < m; k++) {
      memo[k] = new Array(n).fill(-1);
    }
    // 计算 s1[0..] 和 s2[0..] 的 lcs 长度
    return dp(s1, 0, s2, 0);
  };

  // 定义：计算 s1[i..] 和 s2[j..] 的最长公共子序列长度
  const dp = (s1, i, s2, j) => {
    // base case
    if (i === s1.length || j === s2.length) {
      return 0;
    }
    // 如果之前计算过，则直接返回备忘录中的答案
    if (memo[i][j] !== -1) {
      return memo[i][j];
    }
    // 根据 s1[i] 和 s2[j] 的情况做选择
    if (s1[i] === s2[j]) {
      // s1[i] 和 s2[j] 必然在 lcs 中
      memo[i][j] = 1 + dp(s1, i + 1, s2, j + 1);
    } else {
      // s1[i] 和 s2[j] 中至少有一个字符不在 lcs 中，
      memo[i][j] = Math.max(dp(s1, i + 1, s2, j), dp(s1, i, s2, j + 1));
    }

    return memo[i][j];
  };

  console.log(
    '====>>>longestCommonSubsequence',
    longestCommonSubsequence('zabcde', 'acez')
  );
}

{
  const longestCommonSubsequence = (s1, s2) => {
    let m = s1.length,
      n = s2.length;
    const dp = [];
    // 定义：s1[0..i-1] 和 s2[0..j-1] 的 lcs 长度为 dp[i][j]
    // 目标：s1[0..m-1] 和 s2[0..n-1] 的 lcs 长度，即 dp[m][n]
    // base case: dp[0][..] = dp[..][0] = 0
    // 备忘录值为 -1 代表未曾计算
    for (let k = 0; k <= m; k++) {
      dp[k] = new Array(n + 1).fill(0);
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        // 现在 i 和 j 从 1 开始，所以要减一
        if (s1[i - 1] === s2[j - 1]) {
          // s1[i-1] 和 s2[j-1] 必然在 lcs 中
          dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
          // s1[i-1] 和 s2[j-1] 至少有一个不在 lcs 中
          dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
        }
      }
    }

    return dp[m][n];
  };

  console.log(
    '====>>>longestCommonSubsequence',
    longestCommonSubsequence('zabcde', 'acez')
  );
}

{
  const minDistance = (s1, s2) => {
    let m = s1.length,
      n = s2.length;
    // 复用计算 lcs 长度的函数
    let lcs = longestCommonSubsequence(s1, s2);
    return m - lcs + n - lcs;
  };

  const longestCommonSubsequence = (s1, s2) => {
    let m = s1.length,
      n = s2.length;
    const dp = [];
    // 定义：s1[0..i-1] 和 s2[0..j-1] 的 lcs 长度为 dp[i][j]
    // 目标：s1[0..m-1] 和 s2[0..n-1] 的 lcs 长度，即 dp[m][n]
    // base case: dp[0][..] = dp[..][0] = 0
    // 备忘录值为 -1 代表未曾计算
    for (let k = 0; k <= m; k++) {
      dp[k] = new Array(n + 1).fill(0);
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        // 现在 i 和 j 从 1 开始，所以要减一
        if (s1[i - 1] === s2[j - 1]) {
          // s1[i-1] 和 s2[j-1] 必然在 lcs 中
          dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
          // s1[i-1] 和 s2[j-1] 至少有一个不在 lcs 中
          dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
        }
      }
    }

    return dp[m][n];
  };

  console.log('====>>>minDistance', minDistance('sea', 'eat'));
}

{
  // 备忘录
  const memo = [];
  /* 主函数 */
  const minimumDeleteSum = (s1, s2) => {
    let m = s1.length,
      n = s2.length;
    // 备忘录值为 -1 代表未曾计算
    // 备忘录值为 -1 代表未曾计算
    for (let k = 0; k < m; k++) {
      memo[k] = new Array(n).fill(-1);
    }

    return dp(s1, 0, s2, 0);
  };

  // 定义：将 s1[i..] 和 s2[j..] 删除成相同字符串，
  // 最小的 ASCII 码之和为 dp(s1, i, s2, j)。
  const dp = (s1, i, s2, j) => {
    let res = 0;
    // base case
    if (i == s1.length) {
      // 如果 s1 到头了，那么 s2 剩下的都得删除
      for (; j < s2.length; j++) {
        res += s2[j].charCodeAt();
      }
      return res;
    }
    if (j == s2.length) {
      // 如果 s2 到头了，那么 s1 剩下的都得删除
      for (; i < s1.length; i++) {
        res += s1[i].charCodeAt();
      }
      return res;
    }

    if (memo[i][j] !== -1) {
      return memo[i][j];
    }

    if (s1[i] === s2[j]) {
      // s1[i] 和 s2[j] 都是在 lcs 中的，不用删除
      memo[i][j] = dp(s1, i + 1, s2, j + 1);
    } else {
      // s1[i] 和 s2[j] 至少有一个不在 lcs 中，删一个
      memo[i][j] = Math.min(
        s1[i].charCodeAt() + dp(s1, i + 1, s2, j),
        s2[j].charCodeAt() + dp(s1, i, s2, j + 1)
      );
    }
    return memo[i][j];
  };

  console.log('====>>>minimumDeleteSum', minimumDeleteSum('sea', 'eat'));
}

{
  const isMatch = (s, p) => {
    let i = 0,
      j = 0;
    while (i < s.length && j < p.length) {
      // 「.」通配符就是万金油
      if (s[i] == p[j] || p[j] == '.') {
        // 匹配，接着匹配 s[i+1..] 和 p[j+1..]
        i++;
        j++;
      } else {
        // 不匹配
        return false;
      }
    }
    return i == j;
  };
}

{
  if (s[i] == p[j] || p[j] == '.') {
    // 匹配
    if (j < p.length - 1 && p[j + 1] == '*') {
      // 有 * 通配符，可以匹配 0 次或多次
    } else {
      // 无 * 通配符，老老实实匹配 1 次
      i++;
      j++;
    }
  } else {
    // 不匹配
    if (j < p.length - 1 && p[j + 1] == '*') {
      // 有 * 通配符，只能匹配 0 次
    } else {
      // 无 * 通配符，匹配无法进行下去了
      return false;
    }
  }
}

{
  const dp = (s, i, p, j) => {
    if (s[i] == p[j] || p[j] == '.') {
      // 匹配
      if (j < p.length - 1 && p[j + 1] == '*') {
        // 1.1 通配符匹配 0 次或多次
        return dp(s, i, p, j + 2) || dp(s, i + 1, p, j);
      } else {
        // 1.2 常规匹配 1 次
        return dp(s, i + 1, p, j + 1);
      }
    } else {
      // 不匹配
      if (j < p.length - 1 && p[j + 1] == '*') {
        // 2.1 通配符匹配 0 次
        return dp(s, i, p, j + 2);
      } else {
        // 2.2 无法继续匹配
        return false;
      }
    }
  };
}

{
  if (j == p.length) {
    return i == s.length;
  }

  if (j == s.length) {
    return i == p.length;
  }

  let m = s.size(),
    n = p.size();

  if (i == s.length) {
    // 如果能匹配空串，一定是字符和 * 成对儿出现
    if ((n - j) % 2 == 1) {
      return false;
    }
    // 检查是否为 x*y*z* 这种形式
    for (; j + 1 < p.length; j += 2) {
      if (p[j + 1] != '*') {
        return false;
      }
    }
    return true;
  }
}

{
  const memo = new Map();

  const isMatch = (s, p) => {
    // 指针 i，j 从索引 0 开始移动
    return dp(s, 0, p, 0);
  };

  /* 计算 p[j..] 是否匹配 s[i..] */
  const dp = (s, i, p, j) => {
    let m = s.length,
      n = p.length;
    // base case
    if (j === n) {
      return i === m;
    }
    if (i === m) {
      if ((n - j) % 2 == 1) {
        return false;
      }
      for (; j + 1 < n; j += 2) {
        if (p[j + 1] != '*') {
          return false;
        }
      }
      return true;
    }

    // 记录状态 (i, j)，消除重叠子问题
    let key = String(i) + ',' + String(j);
    if (memo.has(key)) return memo[key];

    let res = false;

    if (s[i] === p[j] || p[j] === '.') {
      if (j < n - 1 && p[j + 1] === '*') {
        res = dp(s, i, p, j + 2) || dp(s, i + 1, p, j);
      } else {
        res = dp(s, i + 1, p, j + 1);
      }
    } else {
      if (j < n - 1 && p[j + 1] === '*') {
        res = dp(s, i, p, j + 2);
      } else {
        res = false;
      }
    }
    // 将当前结果记入备忘录
    memo[key] = res;

    return res;
  };

  console.log('====>isMatch', isMatch('zaaab', '.a*b'));
}

{
  const knapsack = (W, N, wt, val) => {
    // vector 全填入 0，base case 已初始化
    const dp = [];
    for (let k = 0; k <= N; k++) {
      dp[k] = new Array(W + 1).fill(0);
    }

    for (let i = 1; i <= N; i++) {
      for (let w = 1; w <= W; w++) {
        if (w - wt[i - 1] < 0) {
          // 当前背包容量装不下，只能选择不装入背包
          dp[i][w] = dp[i - 1][w];
        } else {
          // 装入或者不装入背包，择优
          dp[i][w] = Math.max(
            dp[i - 1][w - wt[i - 1]] + val[i - 1],
            dp[i - 1][w]
          );
        }
      }
    }

    return dp[N][W];
  };

  console.log('====>knapsack', knapsack(4, 3, [2, 1, 3], [4, 2, 3]));
}

{
  const change = (amount, coins) => {
    let n = coins.length;
    const dp = [];
    // base case
    for (let i = 0; i <= n; i++) {
      dp[i] = new Array(amount + 1).fill(0);
      dp[i][0] = 1;
    }

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= amount; j++)
        if (j - coins[i - 1] >= 0) {
          dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
        } else {
          dp[i][j] = dp[i - 1][j];
        }
    }
    return dp[n][amount];
  };

  console.log('====>change', change(5, [1, 2, 5]));
}
{
  const change = (amount, coins) => {
    let n = coins.length;
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1; // base case
    for (let i = 0; i < n; i++) {
      for (let j = 1; j <= amount; j++) {
        if (j - coins[i] >= 0) {
          dp[j] = dp[j] + dp[j - coins[i]];
        }
      }
    }

    return dp[amount];
  };

  console.log('====>change', change(5, [1, 2, 5]));
}

{
  const canPartition = (nums) => {
    let sum = 0;
    for (let num of nums) {
      sum += num;
    }
    // 和为奇数时，不可能划分成两个和相等的集合
    if (sum % 2 != 0) return false;

    let n = nums.length;
    sum = sum / 2;
    const dp = [];
    for (let i = 0; i <= n; i++) {
      dp[i] = new Array(sum + 1).fill(false);
      // base case
      dp[i][0] = true;
    }

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= sum; j++) {
        if (j - nums[i - 1] < 0) {
          // 背包容量不足，不能装入第 i 个物品
          dp[i][j] = dp[i - 1][j];
        } else {
          // 装入或不装入背包
          dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
        }
      }
    }
    return dp[n][sum];
  };

  console.log('====>canPartition', canPartition([1, 5, 11, 5]));
  console.log('====>canPartition', canPartition([1, 2, 3, 5]));
}

{
  const canPartition = (nums) => {
    let sum = 0;
    let n = nums.length;
    for (let num of nums) {
      sum += num;
    }
    // 和为奇数时，不可能划分成两个和相等的集合
    if (sum % 2 != 0) return false;
    sum = sum / 2;

    const dp = new Array(sum + 1).fill(false);
    // base case
    dp[0] = true;

    for (let i = 0; i < n; i++) {
      for (let j = sum; j >= 0; j--) {
        if (j - nums[i] >= 0) {
          dp[j] = dp[j] || dp[j - nums[i]];
        }
      }
    }

    return dp[sum];
  };

  console.log('====>canPartition', canPartition([1, 5, 11, 5]));
  console.log('====>canPartition', canPartition([1, 2, 3, 5]));
}

{
  const maxProfit = (prices) => {
    if (prices.length === 0) return 0;
    let s1 = -prices[0],
      s2 = -Infinity,
      s3 = -Infinity,
      s4 = -Infinity;

    for (let i = 1; i < prices.length; ++i) {
      s1 = Math.max(s1, -prices[i]);
      s2 = Math.max(s2, s1 + prices[i]);
      s3 = Math.max(s3, s2 - prices[i]);
      s4 = Math.max(s4, s3 + prices[i]);
    }
    return Math.max(0, s4);
  };
}

{
  let n = prices.length;
  let dp = [];
  for (let i = 0; i < n; i++) {
    dp[i] = [];
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
  }
  return dp[n - 1][0];
}

{
  const maxProfit_k_1 = (prices) => {
    let n = prices.length;
    let dp = [];
    for (let i = 0; i < n; i++) {
      dp[i] = [];
      if (i - 1 == -1) {
        // base case
        dp[i][0] = 0;
        dp[i][1] = -prices[i];
        continue;
      }
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
      dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
    }
    return dp[n - 1][0];
  };

  console.log('====>maxProfit_k_1', maxProfit_k_1([2, 4, 1]));
  console.log('====>maxProfit_k_1', maxProfit_k_1([3, 2, 6, 5, 0, 3]));
}
{
  const maxProfit_k_1 = (prices) => {
    let n = prices.length;
    // base case: dp[-1][0] = 0, dp[-1][1] = -infinity
    let dp_i_0 = 0,
      dp_i_1 = -Infinity;

    for (let i = 0; i < n; i++) {
      // dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
      dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
      // dp[i][1] = max(dp[i-1][1], -prices[i])
      dp_i_1 = Math.max(dp_i_1, -prices[i]);
    }
    return dp_i_0;
  };

  console.log('====>maxProfit_k_1', maxProfit_k_1([2, 4, 1]));
  console.log('====>maxProfit_k_1', maxProfit_k_1([3, 2, 6, 5, 0, 3]));
}

{
  const maxProfit_k_inf = (prices) => {
    let n = prices.length;
    let dp = [];
    for (let i = 0; i < n; i++) {
      dp[i] = [];
      if (i - 1 === -1) {
        // base case
        dp[i][0] = 0;
        dp[i][1] = -prices[i];
        continue;
      }
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
      dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    }
    return dp[n - 1][0];
  };

  console.log('====>maxProfit_k_inf', maxProfit_k_inf([2, 4, 1]));
  console.log('====>maxProfit_k_inf', maxProfit_k_inf([3, 2, 6, 5, 0, 3]));
}

{
  const maxProfit_k_inf = (prices) => {
    let n = prices.length;
    let dp_i_0 = 0,
      dp_i_1 = -Infinity;
    for (let i = 0; i < n; i++) {
      let temp = dp_i_0;
      dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
      dp_i_1 = Math.max(dp_i_1, temp - prices[i]);
    }
    return dp_i_0;
  };

  console.log('====>maxProfit_k_inf', maxProfit_k_inf([2, 4, 1]));
  console.log('====>maxProfit_k_inf', maxProfit_k_inf([3, 2, 6, 5, 0, 3]));
}

{
  const maxProfit_with_cool = (prices) => {
    let n = prices.length;
    let dp = [];
    for (let i = 0; i < n; i++) {
      dp[i] = [];
      if (i - 1 === -1) {
        // base case 1
        dp[i][0] = 0;
        dp[i][1] = -prices[i];
        continue;
      }
      if (i - 2 === -1) {
        // base case 2
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        // i - 2 小于 0 时根据状态转移方程推出对应 base case
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
        //   dp[i][1]
        // = max(dp[i-1][1], dp[-1][0] - prices[i])
        // = max(dp[i-1][1], 0 - prices[i])
        // = max(dp[i-1][1], -prices[i])
        continue;
      }

      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
      dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    }
    return dp[n - 1][0];
  };

  console.log('====>maxProfit_with_cool', maxProfit_with_cool([2, 4, 1]));
  console.log(
    '====>maxProfit_with_cool',
    maxProfit_with_cool([3, 2, 6, 5, 0, 3])
  );
}
{
  const maxProfit_with_cool = (prices) => {
    let n = prices.length;
    let dp_i_0 = 0,
      dp_i_1 = -Infinity;
    let dp_pre_0 = 0; // 代表 dp[i-2][0]
    for (let i = 0; i < n; i++) {
      let temp = dp_i_0;
      dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
      dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]);
      dp_pre_0 = temp;
    }
    return dp_i_0;
  };

  console.log('====>maxProfit_with_cool', maxProfit_with_cool([2, 4, 1]));
  console.log(
    '====>maxProfit_with_cool',
    maxProfit_with_cool([3, 2, 6, 5, 0, 3])
  );
}

{
  const maxProfit_with_fee = (prices, fee) => {
    let n = prices.length;
    let dp = [];
    for (let i = 0; i < n; i++) {
      dp[i] = [];
      if (i - 1 === -1) {
        // base case
        dp[i][0] = 0;
        dp[i][1] = -prices[i] - fee;
        //   dp[i][1]
        // = max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee)
        // = max(dp[-1][1], dp[-1][0] - prices[i] - fee)
        // = max(-inf, 0 - prices[i] - fee)
        // = -prices[i] - fee
        continue;
      }
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
      dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee);
    }
    return dp[n - 1][0];
  };
}
{
  const maxProfit_with_fee = (prices, fee) => {
    let n = prices.length;
    let dp_i_0 = 0,
      dp_i_1 = -Infinity;
    for (let i = 0; i < n; i++) {
      let temp = dp_i_0;
      dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
      dp_i_1 = Math.max(dp_i_1, temp - prices[i] - fee);
    }
    return dp_i_0;
  };
}

{
  let k = 2;
  let dp = [];
  for (let i = 0; i < n; i++) {
    if (i - 1 === -1) {
      // 处理 base case
      dp[i][k][0] = 0;
      dp[i][k][1] = -prices[i];
      continue;
    }
    dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
    dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);
  }
  return dp[n - 1][k][0];
}
{
  const maxProfit_k_2 = (prices) => {
    let max_k = 2,
      n = prices.length;
    let dp = [];
    for (let i = 0; i < n; i++) {
      dp[i] = [];
      for (let j = 0; j <= max_k; j++) {
        dp[i][j] = [0, 0];
      }
    }

    for (let i = 0; i < n; i++) {
      for (let k = max_k; k >= 1; k--) {
        if (i - 1 === -1) {
          // 处理 base case
          dp[i][k][0] = 0;
          dp[i][k][1] = -prices[i];
          continue;
        }
        dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
        dp[i][k][1] = Math.max(
          dp[i - 1][k][1],
          dp[i - 1][k - 1][0] - prices[i]
        );
      }
    }
    // 穷举了 n × max_k × 2 个状态，正确。
    return dp[n - 1][max_k][0];
  };

  console.log('====>maxProfit_k_2', maxProfit_k_2([2, 4, 1]));
  console.log('====>maxProfit_k_2', maxProfit_k_2([3, 2, 6, 5, 0, 3]));
}

{
  const maxProfit_k_2 = (prices) => {
    // base case
    let dp_i10 = 0,
      dp_i11 = -Infinity;
    let dp_i20 = 0,
      dp_i21 = -Infinity;
    for (let price of prices) {
      dp_i20 = Math.max(dp_i20, dp_i21 + price);
      dp_i21 = Math.max(dp_i21, dp_i10 - price);
      dp_i10 = Math.max(dp_i10, dp_i11 + price);
      dp_i11 = Math.max(dp_i11, -price);
    }
    return dp_i20;
  };

  console.log('====>maxProfit_k_2', maxProfit_k_2([2, 4, 1]));
  console.log('====>maxProfit_k_2', maxProfit_k_2([3, 2, 6, 5, 0, 3]));
}

{
  const maxProfit_k_any = (max_k, prices) => {
    let n = prices.length;
    if (n <= 0) {
      return 0;
    }
    if (max_k > n / 2) {
      // 交易次数 k 没有限制的情况
      return maxProfit_k_inf(prices);
    }

    // base case：
    // dp[-1][...][0] = dp[...][0][0] = 0
    // dp[-1][...][1] = dp[...][0][1] = -infinity
    let dp = [];
    for (let i = 0; i < n; i++) {
      dp[i] = [];
      for (let j = 0; j <= max_k; j++) {
        dp[i][j] = [0, 0];
      }
    }
    // k = 0 时的 base case
    for (let i = 0; i < n; i++) {
      dp[i][0][1] = -Infinity;
      dp[i][0][0] = 0;
    }

    for (let i = 0; i < n; i++) {
      for (let k = max_k; k >= 1; k--) {
        if (i - 1 === -1) {
          // 处理 base case
          dp[i][k][0] = 0;
          dp[i][k][1] = -prices[i];
          continue;
        }
        dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
        dp[i][k][1] = Math.max(
          dp[i - 1][k][1],
          dp[i - 1][k - 1][0] - prices[i]
        );
      }
    }
    // 穷举了 n × max_k × 2 个状态，正确。
    return dp[n - 1][max_k][0];
  };

  const maxProfit_k_inf = (prices) => {
    let n = prices.length;
    let dp_i_0 = 0,
      dp_i_1 = -Infinity;
    for (let i = 0; i < n; i++) {
      let temp = dp_i_0;
      dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
      dp_i_1 = Math.max(dp_i_1, temp - prices[i]);
    }
    return dp_i_0;
  };

  console.log('====>maxProfit_k_any', maxProfit_k_any(2, [2, 4, 1]));
  console.log('====>maxProfit_k_any', maxProfit_k_any(2, [3, 2, 6, 5, 0, 3]));
}

{
  const rob = (nums) => {
    return dp(nums, 0);
  };

  const dp = (nums, start) => {
    if (start >= nums.length) {
      return 0;
    }

    let res = Math.max(
      // 不抢，去下家
      dp(nums, start + 1),
      // 抢，去下下家
      nums[start] + dp(nums, start + 2)
    );
    return res;
  };

  console.log('====>rob', rob([1, 2, 3, 1]));
}

{
  let memo;
  // 主函数
  const rob = (nums) => {
    // 初始化备忘录
    memo = new Array(nums.length).fill(-1);
    return dp(nums, 0);
  };

  const dp = (nums, start) => {
    if (start >= nums.length) {
      return 0;
    }

    // 避免重复计算
    if (memo[start] !== -1) return memo[start];

    let res = Math.max(
      // 不抢，去下家
      dp(nums, start + 1),
      // 抢，去下下家
      nums[start] + dp(nums, start + 2)
    );
    // 记入备忘录
    memo[start] = res;
    return res;
  };

  console.log('====>rob', rob([1, 2, 3, 1]));
}

{
  const rob = (nums) => {
    let n = nums.length;
    // dp[i] = x 表示：
    // 从第 i 间房子开始抢劫，最多能抢到的钱为 x
    // base case: dp[n] = 0
    let dp = new Array(n + 2).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);
    }
    return dp[0];
  };

  console.log('====>rob', rob([1, 2, 3, 1]));
}
{
  const rob = (nums) => {
    let n = nums.length;
    // 记录 dp[i+1] 和 dp[i+2]
    let dp_i_1 = 0,
      dp_i_2 = 0;
    // 记录 dp[i]
    let dp_i = 0;
    for (let i = n - 1; i >= 0; i--) {
      dp_i = Math.max(dp_i_1, nums[i] + dp_i_2);
      dp_i_2 = dp_i_1;
      dp_i_1 = dp_i;
    }
    return dp_i;
  };

  console.log('====>rob', rob([1, 2, 3, 1]));
}

{
  const rob = (nums) => {
    let n = nums.length;
    if (n == 1) return nums[0];
    return Math.max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
  };

  // 仅计算闭区间 [start,end] 的最优结果
  const robRange = (nums, start, end) => {
    let n = nums.length;
    let dp_i_1 = 0,
      dp_i_2 = 0;
    let dp_i = 0;
    for (let i = end; i >= start; i--) {
      dp_i = Math.max(dp_i_1, nums[i] + dp_i_2);
      dp_i_2 = dp_i_1;
      dp_i_1 = dp_i;
    }
    return dp_i;
  };

  console.log('====>rob', rob([1, 2, 3, 1]));
}

{
  const memo = new Map();
  const rob = (root) => {
    if (root == null) return 0;
    // 利用备忘录消除重叠子问题
    if (memo.has(root)) return memo.get(root);
    // 抢，然后去下下家
    let do_it =
      root.val +
      (root.left === null ? 0 : rob(root.left.left) + rob(root.left.right)) +
      (root.right === null ? 0 : rob(root.right.left) + rob(root.right.right));
    // 不抢，然后去下家
    let not_do = rob(root.left) + rob(root.right);

    let res = Math.max(do_it, not_do);
    memo.set(root, res);
    return res;
  };

  let root = {
    val: 3,
    left: {
      val: 2,
      left: null,
      right: {
        val: 3,
        left: null,
        right: null,
      },
    },
    right: {
      val: 3,
      left: null,
      right: {
        val: 1,
        left: null,
        right: null,
      },
    },
  };
  console.log('====>rob', rob(root));
}

{
  const rob = (root) => {
    let res = dp(root);
    return Math.max(res[0], res[1]);
  };

  /* 返回一个大小为 2 的数组 arr
arr[0] 表示不抢 root 的话，得到的最大钱数
arr[1] 表示抢 root 的话，得到的最大钱数 */
  const dp = (root) => {
    if (root === null) return [0, 0];
    let left = dp(root.left);
    let right = dp(root.right);
    // 抢，下家就不能抢了
    let rob = root.val + left[0] + right[0];
    // 不抢，下家可抢可不抢，取决于收益大小
    let not_rob = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

    return [not_rob, rob];
  };

  let root = {
    val: 3,
    left: {
      val: 2,
      left: null,
      right: {
        val: 3,
        left: null,
        right: null,
      },
    },
    right: {
      val: 3,
      left: null,
      right: {
        val: 1,
        left: null,
        right: null,
      },
    },
  };
  console.log('====>rob', rob(root));
}

{
  const te = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 1000);
  });
  console.log('===>>>te', te());
  console.log(
    '===>>>te',
    te.then((res) => {
      console.log('====>>res', res);
      return res;
    })
  );
}

{
  class Pair {
    constructor(fir, sec) {
      this.fir = fir;
      this.sec = sec;
    }
  }

  /* 返回游戏最后先手和后手的得分之差 */
  const stoneGame = (piles) => {
    let n = piles.length;
    // 初始化 dp 数组
    const dp = [];
    for (let i = 0; i < n; i++) {
      dp[i] = [];
      for (let j = i; j < n; j++) {
        dp[i][j] = new Pair(0, 0);
      }
    }

    // 填入 base case
    for (let i = 0; i < n; i++) {
      dp[i][i].fir = piles[i];
      dp[i][i].sec = 0;
    }

    // 倒着遍历数组
    for (let i = n - 2; i >= 0; i--) {
      for (let j = i + 1; j < n; j++) {
        // 先手选择最左边或最右边的分数
        let left = piles[i] + dp[i + 1][j].sec;
        let right = piles[j] + dp[i][j - 1].sec;
        // 套用状态转移方程
        // 先手肯定会选择更大的结果，后手的选择随之改变
        if (left > right) {
          dp[i][j].fir = left;
          dp[i][j].sec = dp[i + 1][j].fir;
        } else {
          dp[i][j].fir = right;
          dp[i][j].sec = dp[i][j - 1].fir;
        }
      }
    }
    let res = dp[0][n - 1];
    return res.fir - res.sec;
  };

  console.log('====>>>stoneGame', stoneGame([1, 100, 3]));
}

{
  const minPathSum = (grid) => {
    let m = grid.length;
    let n = grid[0].length;
    // 计算从左上角走到右下角的最小路径和
    return dp(grid, m - 1, n - 1);
  };

  const dp = (grid, i, j) => {
    // base case
    if (i == 0 && j == 0) {
      return grid[0][0];
    }
    // 如果索引出界，返回一个很大的值，
    // 保证在取 min 的时候不会被取到
    if (i < 0 || j < 0) {
      return Infinity;
    }

    // 左边和上面的最小路径和加上 grid[i][j]
    // 就是到达 (i, j) 的最小路径和
    return Math.min(dp(grid, i - 1, j), dp(grid, i, j - 1)) + grid[i][j];
  };

  console.log(
    '====>>>>minPathSum',
    minPathSum([
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1],
    ])
  );
}

{
  const memo = [];

  const minPathSum = (grid) => {
    let m = grid.length;
    let n = grid[0].length;
    // 构造备忘录，初始值全部设为 -1
    for (let i = 0; i < m; i++) {
      memo[i] = new Array(n).fill(-1);
    }
    // 计算从左上角走到右下角的最小路径和
    return dp(grid, m - 1, n - 1);
  };

  const dp = (grid, i, j) => {
    // base case
    if (i == 0 && j == 0) {
      return grid[0][0];
    }
    // 如果索引出界，返回一个很大的值，
    // 保证在取 min 的时候不会被取到
    if (i < 0 || j < 0) {
      return Infinity;
    }
    // 避免重复计算
    if (memo[i][j] != -1) {
      return memo[i][j];
    }
    // 将计算结果记入备忘录
    memo[i][j] = Math.min(dp(grid, i - 1, j), dp(grid, i, j - 1)) + grid[i][j];

    return memo[i][j];
  };

  console.log(
    '====>>>>minPathSum',
    minPathSum([
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1],
    ])
  );
}

{
  const minPathSum = (grid) => {
    let m = grid.length;
    let n = grid[0].length;
    let dp = [];
    for (let i = 0; i < m; i++) {
      dp[i] = [];
    }

    /**** base case ****/
    dp[0][0] = grid[0][0];

    for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];

    for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];
    /*******************/

    // 状态转移
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      }
    }

    return dp[m - 1][n - 1];
  };

  console.log(
    '====>>>>minPathSum',
    minPathSum([
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1],
    ])
  );
}

{
  const superEggDrop = (K, N) => {
    const memo = [];
    for (let i = 0; i <= K; i++) {
      memo[i] = [];
    }
    const dp = (K, N) => {
      // base case
      if (K === 1) return N;
      if (N === 0) return 0;
      // 避免重复计算;
      if (memo[K][N]) {
        return memo[K][N];
      }

      let res = Infinity;
      for (let i = 1; i < N + 1; i++) {
        // 穷举所有可能
        res = Math.min(res, Math.max(dp(K, N - i), dp(K - 1, i - 1)) + 1);
      }

      // 计入备忘录
      memo[K][N] = res;

      return res;
    };

    return dp(K, N);
  };

  console.log('====>superEggDrop', superEggDrop(2, 100));
}

{
  const superEggDrop = (K, N) => {
    const memo = [];
    for (let i = 0; i <= K; i++) {
      memo[i] = [];
    }
    const dp = (K, N) => {
      // base case
      if (K === 1) return N;
      if (N === 0) return 0;
      // 避免重复计算;
      if (memo[K][N]) {
        return memo[K][N];
      }

      let res = Infinity;
      // 用二分搜索代替线性搜索
      let lo = 1;
      let hi = N;
      while (lo <= hi) {
        let mid = Math.floor((lo + hi) / 2);
        // 碎
        let broken = dp(K - 1, mid - 1);
        // 没碎
        let notBroken = dp(K, N - mid);
        // res = min(max(碎, 没碎)+1)
        if (broken > notBroken) {
          hi = mid - 1;
          res = Math.min(res, broken + 1);
        } else {
          lo = mid + 1;
          res = Math.min(res, notBroken + 1);
        }
      }

      // 计入备忘录
      memo[K][N] = res;

      return res;
    };

    return dp(K, N);
  };

  console.log('====>superEggDrop', superEggDrop(2, 100));
}

{
  const superEggDrop = (k, n) => {
    // m 最多不会超过 n 次（线性扫描）
    const dp = [];
    for (let i = 0; i <= k; i++) {
      dp[i] = new Array(n + 1).fill(0);
    }

    let m = 0;
    while (dp[k][m] < n) {
      m++;
      for (let i = 1; i <= k; i++) {
        dp[i][m] = dp[i][m - 1] + dp[i - 1][m - 1] + 1;
      }
    }
    return m;
  };

  console.log('====>superEggDrop', superEggDrop(2, 100));
}

{
  const superEggDrop = (k, n) => {
    // m 最多不会超过 n 次（线性扫描）
    const dp = [];
    for (let i = 0; i <= k; i++) {
      dp[i] = new Array(n + 1).fill(0);
    }

    let m = 1;
    for (; dp[k][m] < n; m++) {
      for (let i = 1; i <= k; i++) {
        dp[i][m] = dp[i][m - 1] + dp[i - 1][m - 1] + 1;
      }
    }
    return m;
  };

  console.log('====>superEggDrop', superEggDrop(2, 100));
}

{
  const calculateMinimumHP = (grid) => {
    let m = grid.length;
    let n = grid[0].length;
    // 我们想计算左上角到右下角所需的最小生命值
    return dp(grid, m - 1, n - 1);
  };

  const dp = (grid, i, j) => {
    // base case
    if (i == 0 && j == 0) {
      // 保证骑士落地不死就行了
      return grid[i][j] > 0 ? 1 : -grid[i][j] + 1;
    }
    // ...
  };
}

{
  const calculateMinimumHP = (grid) => {
    // 我们想计算左上角到右下角所需的最小生命值
    return dp(grid, 0, 0);
  };

  const dp = (grid, i, j) => {
    let m = grid.length;
    let n = grid[0].length;
    // base case
    if (i == m - 1 && j == n - 1) {
      // 保证骑士落地不死就行了
      return grid[i][j] >= 0 ? 1 : -grid[i][j] + 1;
    }
    // ...
  };
}
{
  let memo = [];
  const calculateMinimumHP = (grid) => {
    let m = grid.length;
    let n = grid[0].length;
    // 备忘录中都初始化为 -1
    for (let i = 0; i < m; i++) {
      memo[i] = new Array(n).fill(-1);
    }

    // 我们想计算左上角到右下角所需的最小生命值
    return dp(grid, 0, 0);
  };

  /* 定义：从 (i, j) 到达右下角，需要的初始血量至少是多少 */
  const dp = (grid, i, j) => {
    let m = grid.length;
    let n = grid[0].length;
    // base case
    if (i === m - 1 && j === n - 1) {
      // 保证骑士落地不死就行了
      return grid[i][j] >= 0 ? 1 : -grid[i][j] + 1;
    }
    if (i === m || j === n) {
      return Infinity;
    }
    // 避免重复计算
    if (memo[i][j] != -1) {
      return memo[i][j];
    }
    // 状态转移逻辑
    let res = Math.min(dp(grid, i, j + 1), dp(grid, i + 1, j)) - grid[i][j];
    // 骑士的生命值至少为 1
    memo[i][j] = res <= 0 ? 1 : res;

    return memo[i][j];
  };

  console.log(
    '====>>>calculateMinimumHP',
    calculateMinimumHP([
      [0, 0, 0],
      [0, -100, 10],
      [0, 0, -5],
    ])
  );
}

{
  const dp = (ring, i, key, j) => {
    // base case，完成输入
    if (j == key.length) return 0;
    // ...
  };
}

{
  // 字符 -> 索引列表
  const charToIndex = new Map();
  // 备忘录
  const memo = [];

  /* 主函数 */
  const findRotateSteps = (ring, key) => {
    let m = ring.length;
    let n = key.length;
    // 备忘录全部初始化为 0
    for (let i = 0; i < m; i++) {
      memo[i] = new Array(n).fill(0);
    }
    // 记录圆环上字符到索引的映射
    for (let i = 0; i < m; i++) {
      let arr = charToIndex.get(ring[i]);
      if (arr) {
        arr.push(i);
      } else {
        charToIndex.set(ring[i], [i]);
      }
    }
    // 圆盘指针最初指向 12 点钟方向，
    // 从第一个字符开始输入 key
    return dp(ring, 0, key, 0);
  };

  // 计算圆盘指针在 ring[i]，输入 key[j..] 的最少操作数
  const dp = (ring, i, key, j) => {
    // base case，完成输入
    if (j === key.length) return 0;
    // 查找备忘录，避免重叠子问题
    if (memo[i][j] !== 0) return memo[i][j];

    let n = ring.length;
    // 做选择
    let res = Infinity;
    // ring 上可能有多个字符 key[j]
    for (let k of charToIndex.get(key[j])) {
      // 拨动指针的次数
      let delta = Math.abs(k - i);
      // 选择顺时针还是逆时针
      delta = Math.min(delta, n - delta);
      // 将指针拨到 ring[k]，继续输入 key[j+1..]
      let subProblem = dp(ring, k, key, j + 1);
      // 选择「整体」操作次数最少的
      res = Math.min(res, 1 + delta + subProblem);
      // PS：加一是因为按动按钮也是一次操作
    }
    // 将结果存入备忘录
    memo[i][j] = res;
    return res;
  };

  console.log('====>>>findRotateSteps', findRotateSteps('godding', 'gd'));
}

{
  // 定义：从 src 出发，k 步之内到达 s 的最小成本
  const dp = (s, k) => {
    // 从 src 到 src，一步都不用走
    if (s === src) {
      return 0;
    }
    // 如果步数用尽，就无解了
    if (k === 0) {
      return -1;
    }

    // ...
  };
}

{
  // 哈希表记录每个点的入度
  // to -> [from, price]
  const indegree = new Map();
  let src, dst;

  const findCheapestPrice = (n, flights, src1, dst1, K) => {
    // 将中转站个数转化成边的条数
    K++;
    src = src1;
    dst = dst1;

    for (let f of flights) {
      let from = f[0];
      let to = f[1];
      let price = f[2];
      // 记录谁指向该节点，以及之间的权重
      let arr = indegree.get(to);
      if (arr) {
        arr.push([from, price]);
      } else {
        indegree.set(to, [[from, price]]);
      }
    }

    return dp(dst, K);
  };

  // 定义：从 src 出发，k 步之内到达 s 的最短路径权重
  const dp = (s, k) => {
    // base case
    if (s == src) {
      return 0;
    }
    if (k == 0) {
      return -1;
    }
    // 初始化为最大值，方便等会儿取最小值
    let res = Infinity;
    if (indegree.has(s)) {
      // 当 s 有入度节点时，分解为子问题
      for (let v of indegree.get(s)) {
        let from = v[0];
        let price = v[1];
        // 从 src 到达相邻的入度节点所需的最短路径权重
        let subProblem = dp(from, k - 1);
        // 跳过无解的情况
        if (subProblem !== -1) {
          res = Math.min(res, subProblem + price);
        }
      }
    }
    // 如果还是初始值，说明此节点不可达
    return res === Infinity ? -1 : res;
  };

  console.log(
    '=====>>findCheapestPrice',
    findCheapestPrice(
      3,
      [
        [0, 1, 100],
        [1, 2, 100],
        [0, 2, 500],
      ],
      0,
      2,
      0
    )
  );
}

{
  // 哈希表记录每个点的入度
  // to -> [from, price]
  const indegree = new Map();
  let src, dst;
  let memo = [];

  const findCheapestPrice = (n, flights, src1, dst1, K) => {
    // 将中转站个数转化成边的条数
    K++;
    src = src1;
    dst = dst1;
    // 初始化备忘录，全部填一个特殊值
    for (let i = 0; i < n; i++) {
      memo[i] = new Array(K + 1).fill(-888);
    }

    for (let f of flights) {
      let from = f[0];
      let to = f[1];
      let price = f[2];
      // 记录谁指向该节点，以及之间的权重
      let arr = indegree.get(to);
      if (arr) {
        arr.push([from, price]);
      } else {
        indegree.set(to, [[from, price]]);
      }
    }

    return dp(dst, K);
  };

  // 定义：从 src 出发，k 步之内到达 s 的最短路径权重
  const dp = (s, k) => {
    // base case
    if (s == src) {
      return 0;
    }
    if (k == 0) {
      return -1;
    }
    // 查备忘录，防止冗余计算
    if (memo[s][k] != -888) {
      return memo[s][k];
    }
    // 初始化为最大值，方便等会儿取最小值
    let res = Infinity;
    if (indegree.has(s)) {
      // 当 s 有入度节点时，分解为子问题
      for (let v of indegree.get(s)) {
        let from = v[0];
        let price = v[1];
        // 从 src 到达相邻的入度节点所需的最短路径权重
        let subProblem = dp(from, k - 1);
        // 跳过无解的情况
        if (subProblem !== -1) {
          res = Math.min(res, subProblem + price);
        }
      }
    }
    // 如果还是初始值，说明此节点不可达
    return res === Infinity ? -1 : res;
  };

  console.log(
    '=====>>findCheapestPrice',
    findCheapestPrice(
      3,
      [
        [0, 1, 100],
        [1, 2, 100],
        [0, 2, 500],
      ],
      0,
      2,
      0
    )
  );
}

{
  /* 图节点的逻辑结构 */
  class Vertex {
    constructor(id, neighbors) {
      this;
    }
  }
}

{
  // 记录所有路径
  const res = [];
  const allPathsSourceTarget = (graph) => {
    // 维护递归过程中经过的路径
    const path = [];
    traverse(graph, 0, path);
    return res;
  };

  /* 图的遍历框架 */
  const traverse = (graph, s, path) => {
    // 添加节点 s 到路径
    path.push(s);

    let n = graph.length;
    if (s == n - 1) {
      // 到达终点
      res.push([...path]);
      path.pop();
      return;
    }

    // 递归每个相邻节点
    for (let v of graph[s]) {
      traverse(graph, v, path);
    }

    // 从路径移出节点 s
    path.pop();
  };

  console.log(
    '=====>>allPathsSourceTarget',
    allPathsSourceTarget([[1, 2], [3], [3], []])
  );
}

{
  const buildGraph = (numCourses, prerequisites) => {
    // 图中共有 numCourses 个节点
    const graph = [];
    for (let i = 0; i < numCourses; i++) {
      graph[i] = [];
    }
    for (let edge of prerequisites) {
      let from = edge[1],
        to = edge[0];
      // 添加一条从 from 指向 to 的有向边
      // 边的方向是「被依赖」关系，即修完课程 from 才能修课程 to
      graph[from].add(to);
    }
    return graph;
  };
}

{
  // 记录一次递归堆栈中的节点
  let onPath;
  // 记录遍历过的节点，防止走回头路
  let visited;
  // 记录图中是否有环
  let hasCycle = false;

  const buildGraph = (numCourses, prerequisites) => {
    // 图中共有 numCourses 个节点
    const graph = [];
    for (let i = 0; i < numCourses; i++) {
      graph[i] = [];
    }
    for (let edge of prerequisites) {
      let from = edge[1],
        to = edge[0];
      // 添加一条从 from 指向 to 的有向边
      // 边的方向是「被依赖」关系，即修完课程 from 才能修课程 to
      graph[from].push(to);
    }
    return graph;
  };

  const canFinish = (numCourses, prerequisites) => {
    const graph = buildGraph(numCourses, prerequisites);
    visited = new Array(numCourses).fill(false);
    onPath = [];

    for (let i = 0; i < numCourses; i++) {
      traverse(graph, i);
    }

    return hasCycle;
  };

  const traverse = (graph, s) => {
    if (onPath[s]) {
      // 出现环
      hasCycle = true;
    }

    if (visited[s] || hasCycle) {
      // 如果已经找到了环，也不用再遍历了
      return;
    }
    // 前序代码位置
    visited[s] = true;
    onPath[s] = true;
    for (let t of graph[s]) {
      traverse(graph, t);
    }
    // 后序代码位置
    onPath[s] = false;
  };

  console.log('======>>canFinish', canFinish(2, [[1, 0]]));
  console.log(
    '======>>canFinish',
    canFinish(2, [
      [1, 0],
      [0, 1],
    ])
  );
}
