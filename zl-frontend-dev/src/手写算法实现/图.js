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

{
  // 记录后序遍历结果
  const postOrder = [];
  // 记录是否存在环
  let hasCycle = false;
  let visited, onPath;

  // 主函数
  const findOrder = (numCourses, prerequisites) => {
    const graph = buildGraph(numCourses, prerequisites);
    visited = new Array(numCourses).fill(false);
    onPath = [];
    // 遍历图
    for (let i = 0; i < numCourses; i++) {
      traverse(graph, i);
    }
    // 有环图无法进行拓扑排序
    if (hasCycle) {
      return [];
    }

    // 逆后序遍历结果即为拓扑排序结果
    return postOrder.reverse();
  };

  const traverse = (graph, s) => {
    if (onPath[s]) {
      // 发现环
      hasCycle = true;
    }
    if (visited[s] || hasCycle) {
      return;
    }

    // 前序遍历位置
    onPath[s] = true;
    visited[s] = true;
    for (let t of graph[s]) {
      traverse(graph, t);
    }
    // 后序遍历位置
    postOrder.push(s);
    onPath[s] = false;
  };

  // 建图函数
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

  console.log(
    '====>>>findOrder',
    findOrder(4, [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
    ])
  );
}

{
  const canFinish = (numCourses, prerequisites) => {
    // 建图，有向边代表「被依赖」关系
    const graph = buildGraph(numCourses, prerequisites);
    // 构建入度数组
    const indgree = new Array(numCourses).fill(0);
    for (let edge of prerequisites) {
      let from = edge[1],
        to = edge[0];
      // 节点 to 的入度加一
      indgree[to]++;
    }

    // 根据入度初始化队列中的节点
    let q = [];
    for (let i = 0; i < numCourses; i++) {
      if (indgree[i] === 0) {
        // 节点 i 没有入度，即没有依赖的节点
        // 可以作为拓扑排序的起点，加入队列
        q.push(i);
      }
    }

    // 记录遍历的节点个数
    let count = 0;
    // 开始执行 BFS 循环
    while (q.length > 0) {
      // 弹出节点 cur，并将它指向的节点的入度减一
      let cur = q.pop();
      count++;
      for (let next of graph[cur]) {
        indgree[next]--;
        if (indgree[next] === 0) {
          // 如果入度变为 0，说明 next 依赖的节点都已被遍历
          q.push(next);
        }
      }
    }

    // 如果所有节点都被遍历过，说明不成环
    return count == numCourses;
  };

  // 建图函数
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

  console.log('======>>canFinish', canFinish(2, [[1, 0]]));
  console.log(
    '======>>canFinish',
    canFinish(2, [
      [1, 0],
      [0, 1],
    ])
  );
}

{
  const findOrder = (numCourses, prerequisites) => {
    // 建图，有向边代表「被依赖」关系
    const graph = buildGraph(numCourses, prerequisites);
    // 构建入度数组
    const indgree = new Array(numCourses).fill(0);
    for (let edge of prerequisites) {
      let from = edge[1],
        to = edge[0];
      // 节点 to 的入度加一
      indgree[to]++;
    }

    // 根据入度初始化队列中的节点
    let q = [];
    for (let i = 0; i < numCourses; i++) {
      if (indgree[i] === 0) {
        // 节点 i 没有入度，即没有依赖的节点
        // 可以作为拓扑排序的起点，加入队列
        q.push(i);
      }
    }

    // 记录拓扑排序结果
    const res = [];
    // 记录遍历的节点个数
    let count = 0;
    // 开始执行 BFS 循环
    while (q.length > 0) {
      // 弹出节点 cur，并将它指向的节点的入度减一
      let cur = q.pop();
      // 弹出节点的顺序即为拓扑排序结果
      res[count] = cur;
      count++;
      for (let next of graph[cur]) {
        indgree[next]--;
        if (indgree[next] === 0) {
          // 如果入度变为 0，说明 next 依赖的节点都已被遍历
          q.push(next);
        }
      }
    }

    if (count != numCourses) {
      // 存在环，拓扑排序不存在
      return new []();
    }

    return res;
  };

  // 建图函数
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

  console.log(
    '====>>>findOrder',
    findOrder(4, [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
    ])
  );
}

{
  // 记录图是否符合二分图性质
  let ok = true;
  // 记录图中节点的颜色，false 和 true 代表两种不同颜色
  let color;
  // 记录图中节点是否被访问过
  let visited;

  // 主函数，输入邻接表，判断是否是二分图
  const isBipartite = (graph) => {
    let n = graph.length;
    color = new Array(n).fill(false);
    visited = new Array(n).fill(false);

    // 因为图不一定是联通的，可能存在多个子图
    // 所以要把每个节点都作为起点进行一次遍历
    // 如果发现任何一个子图不是二分图，整幅图都不算二分图
    for (let v = 0; v < n; v++) {
      if (!visited[v]) {
        traverse(graph, v);
      }
    }

    return ok;
  };

  // DFS 遍历框架
  const traverse = (graph, v) => {
    // 如果已经确定不是二分图了，就不用浪费时间再递归遍历了
    if (!ok) return;

    visited[v] = true;
    for (let w of graph[v]) {
      if (!visited[w]) {
        // 相邻节点 w 没有被访问过
        // 那么应该给节点 w 涂上和节点 v 不同的颜色
        color[w] = !color[v];
        // 继续遍历 w
        traverse(graph, w);
      } else {
        // 相邻节点 w 已经被访问过
        // 根据 v 和 w 的颜色判断是否是二分图
        if (color[w] === color[v]) {
          // 若相同，则此图不是二分图
          ok = false;
        }
      }
    }
  };

  console.log(
    '=====>>>isBipartite1',
    isBipartite([
      [1, 2, 3],
      [0, 2],
      [0, 1, 3],
      [0, 2],
    ])
  );
  console.log(
    '=====>>>isBipartite2',
    isBipartite([
      [1, 3],
      [0, 2],
      [1, 3],
      [0, 2],
    ])
  );
}

{
  // 记录图是否符合二分图性质
  let ok = true;
  // 记录图中节点的颜色，false 和 true 代表两种不同颜色
  let color;
  // 记录图中节点是否被访问过
  let visited;

  const isBipartite = (graph) => {
    let n = graph.length;
    color = new Array(n).fill(false);
    visited = new Array(n).fill(false);

    for (let v = 0; v < n; v++) {
      if (!visited[v]) {
        // 改为使用 BFS 函数
        bfs(graph, v);
      }
    }

    return ok;
  };

  // 从 start 节点开始进行 BFS 遍历
  const bfs = (graph, start) => {
    const q = [];
    visited[start] = true;
    q.push(start);

    while (q.length > 0) {
      let cur = q.pop();
      // 从节点 v 向所有相邻节点扩散
      for (let w of graph[cur]) {
        if (!visited[w]) {
          // 相邻节点 w 没有被访问过
          // 那么应该给节点 w 涂上和节点 v 不同的颜色
          color[w] = !color[cur];
          // 标记 w 节点，并放入队列
          visited[w] = true;
          q.push(w);
        } else {
          // 相邻节点 w 已经被访问过
          // 根据 v 和 w 的颜色判断是否是二分图
          if (color[w] === color[cur]) {
            ok = false;
          }
        }
      }
    }
  };

  console.log(
    '=====>>>isBipartite1',
    isBipartite([
      [1, 2, 3],
      [0, 2],
      [0, 1, 3],
      [0, 2],
    ])
  );
  console.log(
    '=====>>>isBipartite2',
    isBipartite([
      [1, 3],
      [0, 2],
      [1, 3],
      [0, 2],
    ])
  );
}

{
  // 记录图是否符合二分图性质
  let ok = true;
  // 记录图中节点的颜色，false 和 true 代表两种不同颜色
  let color;
  // 记录图中节点是否被访问过
  let visited;

  const possibleBipartiton = (n, dislikes) => {
    // 图节点编号为 1...n
    color = new Array(n + 1).fill(false);
    visited = new Array(n + 1).fill(false);

    // 转化成邻接表表示图结构
    const graph = buildGraph(n, dislikes);

    for (let v = 1; v < n + 1; v++) {
      if (!visited[v]) {
        traverse(graph, v);
      }
    }

    return ok;
  };

  const buildGraph = (n, dislikes) => {
    const graph = [];
    for (let i = 1; i < n + 1; i++) {
      graph[i] = [];
    }
    for (let edge of dislikes) {
      let v = edge[1];
      let w = edge[0];
      // 「无向图」相当于「双向图」
      // v -> w
      graph[v].push(w);
      // w -> v
      graph[w].push(v);
    }

    return graph;
  };

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
        if (color[w] === color[v]) {
          ok = false;
        }
      }
    }
  };

  console.log(
    '=====>>>>possibleBipartiton',
    possibleBipartiton(4, [
      [1, 2],
      [1, 3],
      [2, 4],
    ])
  );

  console.log(
    '=====>>>>possibleBipartiton',
    possibleBipartiton(3, [
      [1, 2],
      [1, 3],
      [2, 3],
    ])
  );
}
