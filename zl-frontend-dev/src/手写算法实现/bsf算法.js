{
  const bfs = (start, target) => {
    const queue = []; // 队列，核心数据结构
    const visited = []; // 避免走回头路

    queue.push(start); // 将起点加入队列
    visited[start] = true;
    let step = 0; // 记录扩散的步数

    while (queue.length > 0) {
      let sz = queue.length;
      /* 将当前队列中的所有节点向四周扩散 */
      for (let i = 0; i < sz; i++) {
        let cur = queue.shift();
        /* 划重点：这里判断是否到达终点 */
        if (cur === target) return step;
        /* 将 cur 的相邻节点加入队列 */
        for (x of cur.adj()) {
          if (!visited[x]) {
            queue.push(x);
            visited[x] = true;
          }
        }
      }
    }
    /* 划重点：更新步数在这里 */
    step++;
  };
}

{
  const minDepth = (root) => {
    if (root === null) return 0;
    let queue = [];
    queue.push(root);
    // root 本身就是一层，depth 初始化为 1
    let depth = 1;

    while (queue.length > 0) {
      let sz = queue.length;
      /* 将当前队列中的所有节点向四周扩散 */
      for (let i = 0; i < sz; i++) {
        let cur = queue.shift();
        /* 判断是否到达终点 */
        if (cur.left == null && cur.right == null) return depth;
        /* 将 cur 的相邻节点加入队列 */
        if (cur.left != null) queue.push(cur.left);
        if (cur.right != null) queue.push(cur.right);
      }
      /* 这里增加步数 */
      depth++;
    }

    return depth;
  };

  console.log('===>>minDepth', minDepth({ val: 1, left: null, right: null }));
  console.log(
    '===>>minDepth',
    minDepth({
      val: 1,
      left: { val: 2, left: null, right: null },
      right: { val: 3, left: { val: 4, left: null, right: null }, right: null },
    })
  );
  console.log(
    '===>>minDepth',
    minDepth({
      val: 1,
      left: { val: 3, left: { val: 4, left: null, right: null }, right: null },
      right: { val: 3, left: { val: 4, left: null, right: null }, right: null },
    })
  );
}

{
  // 将 s[j] 向上拨动一次
  const plusOne = (s, j) => {
    let ch = s.split('');
    if (ch[j] === '9') {
      ch[j] = '0';
    } else {
      ch[j] = String(Number(ch[j]) + 1);
    }
    return ch.join('');
  };
  // 将 s[i] 向下拨动一次
  const minusOne = (s, j) => {
    const ch = s.split('');
    if (ch[j] === '0') {
      ch[j] = '9';
    } else {
      ch[j] = String(Number(ch[j]) - 1);
    }
    return ch.join('');
  };

  const openLock = (deadEnds, target) => {
    // 记录需要跳过的死亡密码
    const deads = new Set();
    deadEnds.forEach((element) => {
      deads.add(element);
    });
    // 记录已经穷举过的密码，防止走回头路
    const visited = new Set();
    const queue = [];
    let step = 0;
    // 从起点开始启动广度优先搜索
    queue.push('0000');
    visited.add('0000');

    while (queue.length > 0) {
      let sz = queue.length;
      /* 将当前队列中的所有节点向周围扩散 */
      for (let i = 0; i < sz; i++) {
        let cur = queue.shift();
        /* 判断是否到达终点 */
        if (deads.has(cur)) {
          continue;
        }
        if (cur === target) {
          return step;
        }

        /* 将一个节点的未遍历相邻节点加入队列 */
        for (let j = 0; j < 4; j++) {
          let up = plusOne(cur, j);
          if (!visited.has(up)) {
            queue.push(up);
            visited.add(up);
          }
          let down = minusOne(cur, j);
          if (!visited.has(down)) {
            queue.push(down);
            visited.add(down);
          }
        }
      }
      /* 在这里增加步数 */
      step++;
    }
    // 如果穷举完都没找到目标密码，那就是找不到了
    return -1;
  };

  console.log('====>>>openLock', openLock(['8888'], '0009'));
  console.log(
    '====>>>openLock',
    openLock(
      ['8887', '8889', '8878', '8898', '8788', '8988', '7888', '9888'],
      '8888'
    )
  );
}

{
  // 将 s[j] 向上拨动一次
  const plusOne = (s, j) => {
    let ch = s.split('');
    if (ch[j] === '9') {
      ch[j] = '0';
    } else {
      ch[j] = String(Number(ch[j]) + 1);
    }
    return ch.join('');
  };
  // 将 s[i] 向下拨动一次
  const minusOne = (s, j) => {
    const ch = s.split('');
    if (ch[j] === '0') {
      ch[j] = '9';
    } else {
      ch[j] = String(Number(ch[j]) - 1);
    }
    return ch.join('');
  };

  const openLock = (deadEnds, target) => {
    const visited = new Set();
    deadEnds.forEach((item) => visited.add(item));
    // 用集合不用队列，可以快速判断元素是否存在
    let q1 = new Set();
    let q2 = new Set();

    let step = 0;
    q1.add('0000');
    q2.add(target);

    while (q1.size > 0 && q2.size > 0) {
      if (q1.size > q2.size) {
        // 交换 q1 和 q2
        temp = q1;
        q1 = q2;
        q2 = temp;
      }
    }

    while (q1.size > 0 && q2.size > 0) {
      // 哈希集合在遍历的过程中不能修改，用 temp 存储扩散结果
      const temp = new Set();
      /* 将 q1 中的所有节点向周围扩散 */
      for (let cur of q1) {
        /* 判断是否到达终点 */
        if (visited.has(cur)) {
          continue;
        }
        if (q2.has(cur)) {
          return step;
        }
        visited.add(cur);

        /* 将一个节点的未遍历相邻节点加入集合 */
        for (let j = 0; j < 4; j++) {
          let up = plusOne(cur, j);
          if (!visited.has(up)) {
            temp.add(up);
          }
          let down = minusOne(cur, j);
          if (!visited.has(down)) {
            temp.add(down);
          }
        }
      }
      /* 在这里增加步数 */
      step++;
      // temp 相当于 q1
      // 这里交换 q1 q2，下一轮 while 就是扩散 q2
      q1 = q2;
      q2 = temp;
    }
    return -1;
  };

  console.log('====>>>openLock', openLock(['8888'], '0009'));
  console.log(
    '====>>>openLock',
    openLock(
      ['8887', '8889', '8878', '8898', '8788', '8988', '7888', '9888'],
      '8888'
    )
  );
}

{
  const neighbor = [
    [1, 3],
    [0, 4, 2],
    [1, 5],
    [0, 4],
    [3, 1, 5],
    [4, 2],
  ];

  const slidingPuzzle = (board, target) => {
    const m = 2,
      n = 3;
    let start = '';
    // 将 2x3 的数组转化成字符串
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        start += board[i][j];
      }
    }
    // 记录一维字符串的相邻索引
    const neighbor = [
      [1, 3],
      [0, 4, 2],
      [1, 5],
      [0, 4],
      [3, 1, 5],
      [4, 2],
    ];

    /******* BFS 算法框架开始 *******/
    const visited = new Set();
    const queue = [];
    queue.push(start);
    visited.add(start);

    let step = 0;
    while (queue.length > 0) {
      let sz = queue.length;
      for (let i = 0; i < sz; i++) {
        let cur = queue.shift();
        // 判断是否达到目标局面
        if (target === cur) {
          return step;
        }
        // 找到数字 0 的索引
        let idx = 0;
        while (cur[idx] !== '0') {
          idx++;
        }
        // 将数字 0 和相邻的数字交换位置
        for (let id of neighbor[idx]) {
          let newBoard = cur.split('');
          let tep = newBoard[id];
          newBoard[id] = newBoard[idx];
          newBoard[idx] = tep;
          // 防止走回头路
          let newStr = newBoard.join('');
          if (!visited.has(newStr)) {
            queue.push(newStr);
            visited.add(newStr);
          }
        }
      }
      step++;
    }
    return -1;
    /******* BFS 算法框架结束 *******/
  };

  console.log(
    '====>>>slidingPuzzle',
    slidingPuzzle(
      [
        [4, 1, 2],
        [5, 0, 3],
      ],
      '123450'
    )
  );
}
