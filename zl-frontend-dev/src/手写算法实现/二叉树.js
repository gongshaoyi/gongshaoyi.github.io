{
  // 记录最大深度
  let res = 0;
  // 记录遍历到的节点的深度
  let depth = 0;

  // 主函数
  const masDepth = (root) => {
    traverse(root);

    return res;
  };

  // 二叉树遍历框架
  const traverse = (root) => {
    if (root === null) {
      // 到达叶子节点，更新最大深度
      res = Math.max(res, depth);
      return;
    }

    // 前序位置
    depth++;
    traverse(root.left);
    traverse(root.right);
    // 后序位置
    depth--;
  };

  const root = {
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: {
          val: 6,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      },
    },
  };

  console.log('===>>>masDepth', masDepth(root));
}

{
  // 定义：输入根节点，返回这棵二叉树的最大深度
  const maxDepth = (root) => {
    if (root === null) {
      return 0;
    }
    // 利用定义，计算左右子树的最大深度
    let leftMax = maxDepth(root.left);
    let rightMax = maxDepth(root.right);

    // 整棵树的最大深度等于左右子树的最大深度取最大值，
    // 然后再加上根节点自己
    let res = Math.max(leftMax, rightMax) + 1;

    return res;
  };

  const root = {
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: {
          val: 6,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      },
    },
  };

  console.log('===>>>masDepth', maxDepth(root));
}

{
  let res = [];
  // 返回前序遍历结果
  const preorderTraverse = (root) => {
    traverse(root);
    return res;
  };
  // 二叉树遍历函数
  const traverse = (root) => {
    if (root === null) {
      return;
    }
    // 前序位置
    res.push(root.val);
    traverse(root.left);
    traverse(root.right);
  };

  const root = {
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: {
          val: 6,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      },
    },
  };

  console.log('===>>>preorderTraverse', preorderTraverse(root));
}

{
  // 定义：输入一棵二叉树的根节点，返回这棵树的前序遍历结果
  const preorderTraverse = (root) => {
    let res = [];
    if (root === null) {
      return res;
    }
    // 前序遍历的结果，root.val 在第一个
    res.push(root.val);
    // 利用函数定义，后面接着左子树的前序遍历结果
    let left = preorderTraverse(root.left);
    res.push(...left);
    // 利用函数定义，最后接着右子树的前序遍历结果
    let right = preorderTraverse(root.right);
    res.push(...right);

    return res;
  };

  const root = {
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: {
          val: 6,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      },
    },
  };

  console.log('===>>>preorderTraverse', preorderTraverse(root));
}

{
  // 二叉树遍历函数
  const traverse = (root, level) => {
    if (root === null) {
      return;
    }

    // 前序位置
    console.log(`节点 ${root} 在第 ${level} 层`);

    traverse(root.left, level + 1);
    traverse(root.right, level + 1);
  };

  // 这样调用
  traverse(root, 1);

  const root = {
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: {
          val: 6,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      },
    },
  };

  traverse(root, 1);
}

{
  // 定义：输入一棵二叉树，返回这棵二叉树的节点总数
  const count = (root) => {
    if (root === null) {
      return 0;
    }

    let leftCount = count(root.left);
    let rightCount = count(root.right);
    // 后序位置
    console.log(
      `节点 ${root} 的左子树有  ${leftCount} 个节点，右子树有 ${rightCount}  个节点`
    );

    return leftCount + rightCount + 1;
  };

  const root = {
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: {
          val: 6,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      },
    },
  };

  count(root);
}

{
  // 记录最大直径的长度
  let maxDiameter = 0;

  const diameterOfBinaryTree = (root) => {
    // 对每个节点计算直径，求最大直径
    traverse(root);
    return maxDiameter;
  };

  // 遍历二叉树
  const traverse = (root) => {
    if (root === null) {
      return;
    }

    // 对每个节点计算直径
    let leftMax = maxDepth(root.left);
    let rightMax = maxDepth(root.right);
    let myDiameter = leftMax + rightMax;
    // 更新全局最大直径
    maxDiameter = Math.max(maxDiameter, myDiameter);
    traverse(root.left);
    traverse(root.right);
  };

  // 计算二叉树的最大深度
  const maxDepth = (root) => {
    if (root == null) {
      return 0;
    }

    let leftMax = maxDepth(root.left);
    let rightMax = maxDepth(root.right);
    return 1 + Math.max(leftMax, rightMax);
  };
}

{
  // 记录最大直径的长度
  let maxDiameter = 0;

  const diameterOfBinaryTree = (root) => {
    maxDepth(root);
    return maxDiameter;
  };

  const maxDepth = (root) => {
    if (root == null) {
      return 0;
    }
    let leftMax = maxDepth(root.left);
    let rightMax = maxDepth(root.right);
    // 后序位置，顺便计算最大直径
    let myDiameter = leftMax + rightMax;
    maxDiameter = Math.max(maxDiameter, myDiameter);

    return 1 + Math.max(leftMax, rightMax);
  };

  const root = {
    val: 3,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 20,
      left: {
        val: 15,
        left: {
          val: 6,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      },
    },
  };

  console.log('===>>>diameterOfBinaryTree', diameterOfBinaryTree(root));
}

{
  // 输入一棵二叉树的根节点，层序遍历这棵二叉树
  const levelTraverse = (root) => {
    if (root == null) return;
    let q = [];
    q.push(root);
    // 从上到下遍历二叉树的每一层
    while (!q.isEmpty()) {
      let sz = q.size();
      // 从左到右遍历每一层的每个节点
      for (let i = 0; i < sz; i++) {
        let cur = q.pop();
        // 将下一层节点放入队列
        if (cur.left != null) {
          q.push(cur.left);
        }
        if (cur.right != null) {
          q.push(cur.right);
        }
      }
    }
  };
}

{
  // 主函数
  const invertTree = (root) => {
    // 遍历二叉树，交换每个节点的子节点
    traverse(root);
    return root;
  };

  // 二叉树遍历函数
  const traverse = (root) => {
    if (root == null) {
      return;
    }

    /**** 前序位置 ****/
    // 每一个节点需要做的事就是交换它的左右子节点
    let tmp = root.left;
    root.left = root.right;
    root.right = tmp;
    // 遍历框架，去遍历左右子树的节点
    traverse(root.left);
    traverse(root.right);
  };
}

{
  // 定义：将以 root 为根的这棵二叉树翻转，返回翻转后的二叉树的根节点
  const invertTree = (root) => {
    if (root === null) {
      return null;
    }
    // 利用函数定义，先翻转左右子树
    let left = invertTree(root.left);
    let right = invertTree(root.right);

    // 然后交换左右子节点
    root.left = right;
    root.right = left;

    // 和定义逻辑自恰：以 root 为根的这棵二叉树已经被翻转，返回 root
    return root;
  };
}

{
  // 二叉树遍历函数
  const traverse = (root) => {
    if (root == null || root.left == null) {
      return;
    }
    // 把左子节点的 next 指针指向右子节点
    root.left.next = root.right;

    traverse(root.left);
    traverse(root.right);
  };
}

{
  const connect = (root) => {
    if (root == null) return null;
    // 遍历「三叉树」，连接相邻节点
    traverse(root.left, root.right);
    return root;
  };

  // 三叉树遍历框架
  const traverse = (node1, node2) => {
    if (node1 == null || node2 == null) {
      return;
    }
    /**** 前序位置 ****/
    // 将传入的两个节点穿起来
    node1.next = node2;

    // 连接相同父节点的两个子节点
    traverse(node1.left, node1.right);
    traverse(node2.left, node2.right);
    // 连接跨越父节点的两个子节点
    traverse(node1.right, node2.left);
  };
}

{
  // 定义：将以 root 为根的树拉平为链表
  const flatten = (root) => {
    // base case
    if (root == null) return;

    // 利用定义，把左右子树拉平
    flatten(root.left);
    flatten(root.right);

    /**** 后序遍历位置 ****/
    // 1、左右子树已经被拉平成一条链表
    let left = root.left;
    let right = root.right;

    // 2、将左子树作为右子树
    root.left = null;
    root.right = left;

    // 3、将原先的右子树接到当前右子树的末端
    let p = root;
    while (p.right != null) {
      p = p.right;
    }
    p.right = right;
  };
}

{
  /* 主函数 */
  const constructMaximumBinaryTree = (nums) => {
    return build(nums, 0, nums.length - 1);
  };

  // 定义：将 nums[lo..hi] 构造成符合条件的树，返回根节点
  const build = (nums, lo, hi) => {
    // base case
    if (lo > hi) {
      return null;
    }

    // 找到数组中的最大值和对应的索引
    let index;
    let maxVal = -Infinity;
    for (let i = lo; i <= hi; i++) {
      if (maxVal < nums[i]) {
        maxVal = nums[i];
        index = i;
      }
    }

    // 先构造出根节点
    let root = {
      val: maxVal,
      left: null,
      right: null,
    };

    root.left = build(nums, lo, index - 1);
    root.right = build(nums, index + 1, hi);

    return root;
  };

  console.log(
    'constructMaximumBinaryTree',
    constructMaximumBinaryTree([3, 2, 1, 6, 0, 5])
  );
}

{
  // 存储 inorder 中值到索引的映射
  const valToIndex = new Map();

  /* 主函数 */
  const buildTree = (preorder, inorder) => {
    for (let i = 0; i < inorder.length; i++) {
      valToIndex.set(inorder[i], i);
    }
    // 根据函数定义，用 preorder 和 inorder 构造二叉树
    return build(
      preorder,
      0,
      preorder.length - 1,
      inorder,
      0,
      inorder.length - 1
    );
  };

  /* 
    build 函数的定义：
    若前序遍历数组为 preorder[preStart..preEnd]，
    中序遍历数组为 inorder[inStart..inEnd]，
    构造二叉树，返回该二叉树的根节点 
*/
  const build = (preorder, preStart, preEnd, inorder, inStart, inEnd) => {
    if (preStart > preEnd) {
      return null;
    }

    // root 节点对应的值就是前序遍历数组的第一个元素
    let rootVal = preorder[preStart];
    // rootVal 在中序遍历数组中的索引
    // let index = 0;
    // for (let i = inStart; i <= inEnd; i++) {
    //   if (inorder[i] === rootVal) {
    //     index = i;
    //     break;
    //   }
    // }
    let index = valToIndex.get(rootVal);
    let leftSize = index - inStart;

    // 先构造出当前根节点
    let root = {
      val: rootVal,
      left: null,
      right: null,
    };

    // 递归构造左右子树
    root.left = build(
      preorder,
      preStart + 1,
      preStart + leftSize,
      inorder,
      inStart,
      index - 1
    );
    root.right = build(
      preorder,
      preStart + 1,
      preStart + leftSize + 1,
      inorder,
      index + 1,
      inEnd
    );

    return root;
  };
}

{
  // 存储 inorder 中值到索引的映射
  const valToIndex = new Map();

  /* 主函数 */
  const buildTree = (inorder, postorder) => {
    for (let i = 0; i < inorder.length; i++) {
      valToIndex.set(inorder[i], i);
    }
    // 根据函数定义，用 preorder 和 inorder 构造二叉树
    return build(
      inorder,
      0,
      inorder.length - 1,
      postorder,
      0,
      postorder.length - 1
    );
  };

  /* 
    build 函数的定义：
    后序遍历数组为 postorder[postStart..postEnd]，
    中序遍历数组为 inorder[inStart..inEnd]，
    构造二叉树，返回该二叉树的根节点 
*/
  const build = (inorder, inStart, inEnd, postorder, postStart, postEnd) => {
    if (inStart > inEnd) {
      return null;
    }

    // root 节点对应的值就是后序遍历数组的最后一个元素
    let rootVal = postorder[postEnd];
    // rootVal 在中序遍历数组中的索引
    let index = valToIndex.get(rootVal);
    // 左子树的节点个数
    let leftSize = index - inStart;

    // 先构造出当前根节点
    let root = {
      val: rootVal,
      left: null,
      right: null,
    };

    // 递归构造左右子树
    root.left = build(
      inorder,
      inStart,
      index - 1,
      postorder,
      postStart,
      postStart + leftSize
    );
    root.right = build(
      inorder,
      index + 1,
      inEnd,
      postorder,
      postStart + leftSize,
      postEnd - 1
    );

    return root;
  };
}

{
  // 存储 postorder 中值到索引的映射
  const valToIndex = new Map();

  /* 主函数 */
  const constructFromPrePost = (preorder, postorder) => {
    for (let i = 0; i < postorder.length; i++) {
      valToIndex.set(postorder[i], i);
    }
    // 根据函数定义，用 preorder 和 inorder 构造二叉树
    return build(
      preorder,
      0,
      preorder.length - 1,
      postorder,
      0,
      postorder.length - 1
    );
  };

  // 定义：根据 preorder[preStart..preEnd] 和 postorder[postStart..postEnd]
  // 构建二叉树，并返回根节点。
  const build = (preorder, preStart, preEnd, postorder, postStart, postEnd) => {
    if (preStart > preEnd) {
      return null;
    }
    if (preStart == preEnd) {
      return {
        val: preorder[preStart],
        left: null,
        right: null,
      };
    }

    // root 节点对应的值就是前序遍历数组的第一个元素
    let rootVal = preorder[preStart];
    // root.left 的值是前序遍历第二个元素
    // 通过前序和后序遍历构造二叉树的关键在于通过左子树的根节点
    // 确定 preorder 和 postorder 中左右子树的元素区间
    let leftRootVal = preorder[preStart + 1];
    // leftRootVal 在后序遍历数组中的索引
    let index = valToIndex.get(leftRootVal);
    // 左子树的元素个数
    let leftSize = index - postStart + 1;

    // 先构造出当前根节点
    let root = { val: rootVal, left: null, right: null };
    // 递归构造左右子树
    // 根据左子树的根节点索引和元素个数推导左右子树的索引边界
    root.left = build(
      preorder,
      preStart + 1,
      preStart + leftSize,
      postorder,
      postStart,
      index
    );
    root.right = build(
      preorder,
      preStart + leftSize + 1,
      preEnd,
      postorder,
      index + 1,
      postEnd - 1
    );

    return root;
  };
}

{
  // 代表分隔符的字符
  let SEP = ',';
  // 代表 null 空指针的字符
  let NULL = '#';

  let sb = '';
  /* 将二叉树打平为数组 */
  const traverse = (root, arr) => {
    if (root === null) {
      sb = `${sb}${NULL}${SEP}`;
      return;
    }

    /****** 前序位置 ******/
    sb = `${root.val}${SEP}`;

    traverse(root.left, arr);
    traverse(root.right, arr);
  };
}

{
  // 代表分隔符的字符
  let SEP = ',';
  // 代表 null 空指针的字符
  let NULL = '#';
  const serialize = (root) => {
    let arr = [];
    traverse(root, arr);
    return arr.join(SEP);
  };
  /* 辅助函数，将二叉树存入 arr*/
  const traverse = (root, arr) => {
    if (root === null) {
      arr.push(NULL);
      return;
    }

    /****** 前序位置 ******/
    arr.push(root.val);

    traverse(root.left, arr);
    traverse(root.right, arr);
  };

  console.log('===>>serialize', serialize());
}

{
  // 代表分隔符的字符
  let SEP = ',';
  // 代表 null 空指针的字符
  let NULL = '#';
  /* 主函数，将字符串反序列化为二叉树结构 */
  const deserialize = (data) => {
    // 将字符串转化成数组；
    let nodes = data.split(SEP);

    return traverse(nodes);
  };

  /* 辅助函数，通过 nodes 列表构造二叉树 */
  const traverse = (nodes) => {
    if (nodes.length <= 0) {
      return null;
    }

    /****** 前序位置 ******/
    // 列表最左侧就是根节点
    let first = nodes.shift();
    if (first === NULL) {
      return null;
    }

    let root = {
      val: Number(first),
    };

    root.left = traverse(nodes);
    root.right = traverse(nodes);

    return root;
  };

  console.log('===>>deserialize', deserialize('1,2,#,4,#,#,3,#,#'));
}

{
  // 代表分隔符的字符
  let SEP = ',';
  // 代表 null 空指针的字符
  let NULL = '#';
  const serialize = (root) => {
    let arr = [];
    traverse(root, arr);
    return arr.join(SEP);
  };
  /* 辅助函数，将二叉树存入 arr*/
  const traverse = (root, arr) => {
    if (root === null) {
      arr.push(NULL);
      return;
    }

    traverse(root.left, arr);
    traverse(root.right, arr);

    /****** 后序位置 ******/
    arr.push(root.val);
  };

  console.log('===>>serialize', serialize());
}

{
  // 代表分隔符的字符
  let SEP = ',';
  // 代表 null 空指针的字符
  let NULL = '#';
  /* 主函数，将字符串反序列化为二叉树结构 */
  const deserialize = (data) => {
    // 将字符串转化成数组；
    let nodes = data.split(SEP);

    return traverse(nodes);
  };

  /* 辅助函数，通过 nodes 列表构造二叉树 */
  const traverse = (nodes) => {
    if (nodes.length <= 0) {
      return null;
    }

    root.left = traverse(nodes);
    root.right = traverse(nodes);

    /****** 后序位置 ******/
    let first = nodes.pop();
    if (first === NULL) {
      return null;
    }

    let root = {
      val: Number(first),
    };

    return root;
  };

  console.log('===>>deserialize', deserialize('1,2,#,4,#,#,3,#,#'));
}

{
  // 代表分隔符的字符
  let SEP = ',';
  // 代表 null 空指针的字符
  let NULL = '#';
  /* 主函数，将字符串反序列化为二叉树结构 */
  const deserialize = (data) => {
    // 将字符串转化成数组；
    let nodes = data.split(SEP);

    return traverse(nodes);
  };

  /* 辅助函数，通过 nodes 列表构造二叉树 */
  const traverse = (nodes) => {
    if (nodes.length <= 0) {
      return null;
    }

    // 从后往前取出元素
    let last = nodes.pop();
    if (last === NULL) {
      return null;
    }

    let root = {
      val: Number(last),
    };

    root.right = traverse(nodes);
    root.left = traverse(nodes);

    return root;
  };

  console.log('===>>deserialize', deserialize('1,2,#,4,#,#,3,#,#'));
}

{
  // 代表分隔符的字符
  let SEP = ',';
  // 代表 null 空指针的字符
  let NULL = '#';

  const serialize = (root) => {
    let arr = [];
    traverse(root, arr);
    return arr.join(SEP);
  };
  /* 辅助函数，将二叉树存入 arr*/
  const traverse = (root, arr) => {
    if (root === null) {
      arr.push(NULL);
      return;
    }

    traverse(root.left, arr);
    /****** 后序位置 ******/
    arr.push(root.val);
    /****** ***** ******/
    traverse(root.right, arr);
  };
}

{
  // 代表分隔符的字符
  let SEP = ',';
  // 代表 null 空指针的字符
  let NULL = '#';

  /* 将二叉树序列化为字符串 */
  const serialize = (root) => {
    if (root == null) return '';
    let arr = [];
    // 初始化队列，将 root 加入队列
    let q = [];
    q.push(root);

    while (q.length > 0) {
      let cur = q.pop();
      /* 层级遍历代码位置 */
      if (cur === null) {
        arr.push(NULL);
        continue;
      }
      arr.push(cur.val);
      /*****************/

      q.push(cur.left);
      q.push(cur.right);
    }

    return arr.join(SEP);
  };

  console.log('===>>serialize', serialize());
}

{
  // 代表分隔符的字符
  let SEP = ',';
  // 代表 null 空指针的字符
  let NULL = '#';
  /* 主函数，将字符串反序列化为二叉树结构 */
  const deserialize = (data) => {
    // 将字符串转化成数组；
    let nodes = data.split(SEP);
    let first = nodes[0];
    // 第一个元素就是 root 的值
    let root = {
      val: Number(first),
    };
    let q = [];
    q.push(root);

    for (let i = 1; i < nodes.length; ) {
      // 队列中存的都是父节点
      let parent = q.pop();
      // 父节点对应的左侧子节点的值
      let left = nodes[i++];
      if (left !== NULL) {
        parent.left = {
          val: Number(left),
        };
        q.push(parent.left);
      } else {
        parent.left = null;
      }

      // 父节点对应的右侧子节点的值
      let right = nodes[i++];
      if (right !== NULL) {
        parent.right = {
          val: Number(right),
        };
        q.push(parent.right);
      } else {
        parent.right = null;
      }
    }

    return root;
  };

  console.log('===>>deserialize', deserialize('1,2,3,#,4,#,#,#,#'));
}

{
  const traverse = (root) => {
    // 对于空节点，可以用一个特殊字符表示
    if (root == null) {
      return '#';
    }

    // 将左右子树序列化成字符串
    let left = traverse(root.left);
    let right = traverse(root.right);
    /* 后序遍历代码位置 */
    // 左右子树加上自己，就是以自己为根的二叉树序列化结果
    let subTree = left + ',' + right + ',' + root.val;
    return subTree;
  };
}

{
  // 记录所有子树
  const memo = new Set();
  // 记录重复的子树根节点
  const res = [];

  const traverse = (root) => {
    // 对于空节点，可以用一个特殊字符表示
    if (root == null) {
      return '#';
    }

    // 将左右子树序列化成字符串
    let left = traverse(root.left);
    let right = traverse(root.right);
    /* 后序遍历代码位置 */
    // 左右子树加上自己，就是以自己为根的二叉树序列化结果
    let subTree = left + ',' + right + ',' + root.val;
    if (memo.has(subTree)) {
      // 有人和我重复，把自己加入结果列表
      res.push(root);
    } else {
      // 暂时没人跟我重复，把自己加入集合
      memo.add(subTree);
    }
    return subTree;
  };
}

{
  // 记录所有子树
  const memo = new Map();
  // 记录重复的子树根节点
  const res = [];

  /* 主函数 */
  const findDuplicateSubtrees = (root) => {
    traverse(root);
    return res;
  };

  /* 辅助函数 */
  const traverse = (root) => {
    // 对于空节点，可以用一个特殊字符表示
    if (root == null) {
      return '#';
    }

    // 将左右子树序列化成字符串
    let left = traverse(root.left);
    let right = traverse(root.right);
    /* 后序遍历代码位置 */
    // 左右子树加上自己，就是以自己为根的二叉树序列化结果
    let subTree = left + ',' + right + ',' + root.val;
    let freq = memo.get(subTree);
    if (freq) {
      if (freq === 1) {
        // 有人和我重复，把自己加入结果列表
        res.push(root);
      }
      memo.set(subTree, freq + 1);
    } else {
      // 暂时没人跟我重复，把自己加入集合
      memo.set(subTree, 1);
    }
    return subTree;
  };
}

{
  // 用于辅助合并有序数组
  let temp = [];
  const sort = (nums) => {
    // 排序整个数组（原地修改）
    traverse(nums, 0, nums.length - 1);
  };

  const traverse = (nums, lo, hi) => {
    if (lo == hi) {
      // 单个元素不用排序
      return;
    }

    const mid = Math.floor((lo + hi) / 2);
    // 先对左半部分数组 nums[lo..mid] 排序
    traverse(nums, lo, mid);
    // 再对右半部分数组 nums[mid+1..hi] 排序
    traverse(nums, mid + 1, hi);
    // 将两部分有序数组合并成一个有序数组
    merge(nums, lo, mid, hi);
  };

  // 将 nums[lo..mid] 和 nums[mid+1..hi] 这两个有序数组合并成一个有序数组
  const merge = (nums, lo, mid, hi) => {
    // 先把 nums[lo..hi] 复制到辅助数组中
    // 以便合并后的结果能够直接存入 nums
    temp = [...nums];

    // 数组双指针技巧，合并两个有序数组
    let i = lo;
    let j = mid + 1;
    for (let p = lo; p <= hi; p++) {
      if (i === mid + 1) {
        // 左半边数组已全部被合并
        nums[p] = temp[j++];
      } else if (j == hi + 1) {
        // 右半边数组已全部被合并
        nums[p] = temp[i++];
      } else if (temp[i] > temp[j]) {
        nums[p] = temp[j++];
      } else {
        nums[p] = temp[i++];
      }
    }
  };

  let nums = [1, 3, 4, 5, 2];
  sort(nums);
  console.log(nums);
}

{
  class Pair {
    constructor(val, id) {
      this.val = val;
      this.id = id;
    }
  }
  // 归并排序所用的辅助数组
  let temp = [];
  // 记录每个元素后面比自己小的元素个数
  let count;

  // 主函数
  const countSmaller = (nums) => {
    let n = nums.length;
    let arr = [];
    // 记录元素原始的索引位置，以便在 count 数组中更新结果
    for (let i = 0; i < n; i++) {
      arr[i] = new Pair(nums[i], i);
    }
    count = new Array(n).fill(0);

    // 执行归并排序，本题结果被记录在 count 数组中
    sort(arr, 0, n - 1);
  };

  // 归并排序
  const sort = (arr, lo, hi) => {
    if (lo == hi) {
      // 单个元素不用排序
      return;
    }
    const mid = Math.floor((lo + hi) / 2);
    sort(arr, lo, mid);
    sort(arr, mid + 1, hi);
    merge(arr, lo, mid, hi);
  };

  // 合并两个有序数组
  const merge = (arr, lo, mid, hi) => {
    // 先把 nums[lo..hi] 复制到辅助数组中
    // 以便合并后的结果能够直接存入 nums
    temp = [...arr];

    // 数组双指针技巧，合并两个有序数组
    let i = lo;
    let j = mid + 1;
    for (let p = lo; p <= hi; p++) {
      if (i === mid + 1) {
        // 左半边数组已全部被合并
        arr[p] = temp[j++];
      } else if (j === hi + 1) {
        // 右半边数组已全部被合并
        arr[p] = temp[i++];
        // 更新 count 数组
        count[arr[p].id] += j - mid - 1;
      } else if (temp[i].val > temp[j].val) {
        arr[p] = temp[j++];
      } else {
        arr[p] = temp[i++];
        // 更新 count 数组
        count[arr[p].id] += j - mid - 1;
      }
    }
  };

  let nums = [1, 3, 4, 5, 2];
  countSmaller(nums);
  console.log(count);
}

{
  let rank = 0;
  let res;

  const kthSmallest = (root, k) => {
    // 利用 BST 的中序遍历特性
    traverse(root, k);
    return res;
  };

  const traverse = (root, k) => {
    if (root === null) return;
    traverse(root.left, k);
    /* 中序遍历代码位置 */
    rank++;
    if (k === rank) {
      res = root.val;
      return;
    }
    /*****************/
    traverse(root.right, k);
  };

  const root = {
    val: 5,
    left: {
      val: 3,
      left: {
        val: 2,
        left: {
          val: 1,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 4,
        left: null,
        right: null,
      },
    },
    right: {
      val: 6,
      left: null,
      right: null,
    },
  };

  console.log('===>>>>>kthSmallest', kthSmallest(root, 3));
}

{
  const convertBST = (root) => {
    traverse(root);
    return root;
  };

  // 记录累加和
  let sum = 0;
  const traverse = (root) => {
    if (root === null) {
      return;
    }
    traverse(root.right);
    // 维护累加和
    sum += root.val;
    // 将 BST 转化成累加树
    root.val = sum;
    traverse(root.left);
  };

  const root = {
    val: 5,
    left: {
      val: 3,
      left: {
        val: 2,
        left: {
          val: 1,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 4,
        left: null,
        right: null,
      },
    },
    right: {
      val: 6,
      left: null,
      right: null,
    },
  };

  console.log('===>>>>>convertBST', convertBST(root));
}

{
  const isValidBST = (root) => {
    if (root === null) return true;
    if (root.left !== null && root.val <= root.left.val) {
      return false;
    }
    if (root.right !== null && root.val >= root.right.val) {
      return false;
    }

    return isValidBST(root.left) && isValidBST(root.right);
  };
}

{
  const isValidBST = (root) => {
    return traverse(root, null, null);
  };

  /* 限定以 root 为根的子树节点必须满足 max.val > root.val > min.val */
  const traverse = (root, min, max) => {
    // base case
    if (root === null) return true;
    // 若 root.val 不符合 max 和 min 的限制，说明不是合法 BST
    if (min !== null && root.val <= min.val) return false;
    if (max !== null && root.val >= max.val) return false;

    // 限定左子树的最大值是 root.val，右子树的最小值是 root.val
    return traverse(root.left, min, root) && traverse(root.right, root, max);
  };

  const root = {
    val: 5,
    left: {
      val: 3,
      left: {
        val: 2,
        left: {
          val: 1,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 4,
        left: null,
        right: null,
      },
    },
    right: {
      val: 6,
      left: null,
      right: null,
    },
  };

  console.log('===>>>>>isValidBST', isValidBST(root));
}

{
  const isInBST = (root, target) => {
    if (root === null) return false;
    if (root.val === target) return true;

    // 当前节点没找到就递归地去左右子树寻找
    return isInBST(root.left, target) || isInBST(root.right, target);
  };

  const root = {
    val: 5,
    left: {
      val: 3,
      left: {
        val: 2,
        left: {
          val: 1,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 4,
        left: null,
        right: null,
      },
    },
    right: {
      val: 6,
      left: null,
      right: null,
    },
  };

  console.log('===>>>>>isInBST', isInBST(root, 4));
  console.log('===>>>>>isInBST', isInBST(root, 8));
}

{
  const isInBST = (root, target) => {
    if (root === null) return false;
    if (root.val === target) return true;
    if (root.val > target) {
      return isInBST(root.left, target);
    }
    if (root.val < target) {
      return isInBST(root.right, target);
    }
  };

  const root = {
    val: 7,
    left: {
      val: 4,
      left: {
        val: 2,
        left: {
          val: 1,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 5,
        left: null,
        right: null,
      },
    },
    right: {
      val: 8,
      left: null,
      right: null,
    },
  };

  console.log('===>>>>>isInBST', isInBST(root, 4));
  console.log('===>>>>>isInBST', isInBST(root, 8));
}

{
  const bst = (root, target) => {
    if (root.val == target)
      if (root.val < target) {
        // 找到目标，做点什么
        bst(root.right, target);
      }
    if (root.val > target) {
      bst(root.left, target);
    }
  };
}

{
  const insertIntoBST = (root, val) => {
    // 找到空位置插入新节点
    if (root === null)
      return {
        val: val,
        left: null,
        right: null,
      };
    // if (root.val == val)
    //     BST 中一般不会插入已存在元素
    if (root.val < val) {
      root.right = insertIntoBST(root.right, val);
    }
    if (root.val > val) {
      root.left = insertIntoBST(root.left, val);
    }

    return root;
  };

  const root = {
    val: 7,
    left: {
      val: 4,
      left: {
        val: 2,
        left: {
          val: 1,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 5,
        left: null,
        right: null,
      },
    },
    right: {
      val: 8,
      left: null,
      right: null,
    },
  };

  console.log('===>>>>>insertIntoBST', insertIntoBST(root, 3));
  console.log('===>>>>>insertIntoBST', insertIntoBST(root, 8));
}

{
  const deleteNode = (root, key) => {
    if (root === null) return null;
    if (root.val == key) {
      // 找到啦，进行删除
      // 这两个 if 把情况 1 和 2 都正确处理了
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }

      // 处理情况 3
      let minNode = getMin(root.right);
      root.val = minNode.val;
      root.right = deleteNode(root.right, minNode.val);
    } else if (root.val > key) {
      // 去左子树找
      root.left = deleteNode(root.left, key);
    } else if (root.val < key) {
      // 去右子树找
      root.right = deleteNode(root.right, key);
    }
    return root;
  };

  const getMin = (node) => {
    // BST 最左边的就是最小的
    while (node.left !== null) {
      node = node.left;
    }

    return node;
  };

  const root = {
    val: 7,
    left: {
      val: 4,
      left: {
        val: 2,
        left: {
          val: 1,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 5,
        left: null,
        right: null,
      },
    },
    right: {
      val: 8,
      left: null,
      right: null,
    },
  };

  console.log('===>>>>>deleteNode', deleteNode(root, 4));
}

{
  /* 主函数 */
  const numTrees = (n) => {
    // 计算闭区间 [1, n] 组成的 BST 个数
    return count(1, n);
  };

  /* 计算闭区间 [lo, hi] 组成的 BST 个数 */
  const count = (lo, hi) => {
    // base case
    if (lo > hi) return 1;

    let res = 0;
    for (let i = lo; i <= hi; i++) {
      // i 的值作为根节点 root
      let left = count(lo, i - 1);
      let right = count(i + 1, hi);
      // 左右子树的组合数乘积是 BST 的总数
      res += left * right;
    }

    return res;
  };

  console.log('=====>>>>>numTrees', numTrees(3));
  console.log('=====>>>>>numTrees', numTrees(1));
}

{
  const memo = [];
  /* 主函数 */
  const numTrees = (n) => {
    // 备忘录的值初始化为 0
    for (let i = 0; i <= n; i++) {
      memo[i] = new Array(n + 1).fill(0);
    }
    // 计算闭区间 [1, n] 组成的 BST 个数
    return count(1, n);
  };

  /* 计算闭区间 [lo, hi] 组成的 BST 个数 */
  const count = (lo, hi) => {
    // base case
    if (lo > hi) return 1;
    // 查备忘录
    if (memo[lo][hi] !== 0) {
      return memo[lo][hi];
    }

    let res = 0;
    for (let i = lo; i <= hi; i++) {
      // i 的值作为根节点 root
      let left = count(lo, i - 1);
      let right = count(i + 1, hi);
      // 左右子树的组合数乘积是 BST 的总数
      res += left * right;
    }

    // 将结果存入备忘录
    memo[lo][hi] = res;

    return res;
  };

  console.log('=====>>>>>numTrees', numTrees(3));
  console.log('=====>>>>>numTrees', numTrees(1));
}

{
  const generateTrees = (n) => {
    if (n === 0) return [];
    // 构造闭区间 [1, n] 组成的 BST
    return build(1, n);
  };

  /* 构造闭区间 [lo, hi] 组成的 BST */
  const build = (lo, hi) => {
    let res = [];
    // base case
    if (lo > hi) {
      res.push(null);
      return res;
    }

    // 1、穷举 root 节点的所有可能。
    for (let i = lo; i <= hi; i++) {
      // 2、递归构造出左右子树的所有合法 BST。
      let leftTree = build(lo, i - 1);
      let rightTree = build(i + 1, hi);
      // 3、给 root 节点穷举所有左右子树的组合。
      for (let left of leftTree) {
        for (let right of rightTree) {
          // i 作为根节点 root 的值
          let root = {
            val: i,
          };
          root.left = left;
          root.right = right;
          res.push(root);
        }
      }
    }

    return res;
  };

  console.log('===>>>generateTrees', generateTrees(3));
}

{
  // 全局变量，记录最终结果
  let maxSum = 0;

  /* 主函数 */
  const maxSumBST = (root) => {
    traverse(root);
    return maxSum;
  };

  /* 遍历二叉树 */
  const traverse = (root) => {
    if (root === null) {
      return;
    }

    /******* 前序遍历位置 *******/
    // 判断左右子树是不是 BST
    if (!isBST(root.left) || !isBST(root.right)) {
      // 继续后续操作
      // goto next;
    }
    // 计算左子树的最大值和右子树的最小值
    let leftMax = findMax(root.left);
    let rightMin = findMin(root.right);
    // 判断以 root 节点为根的树是不是 BST
    if (root.val <= leftMax || root.val >= rightMin) {
      // 继续后续操作
      // goto next;
    }
    // 如果条件都符合，计算当前 BST 的节点之和
    let leftSum = findSum(root.left);
    let rightSum = findSum(root.right);
    let rootSum = leftSum + rightSum + root.val;
    // 计算 BST 节点的最大和
    maxSum = Math.max(maxSum, rootSum);
    /**************************/

    // 递归左右子树
    traverse(root.left);
    traverse(root.right);
  };

  /* 计算以 root 为根的二叉树的最大值 */
  const findMax = (root) => {};

  /* 计算以 root 为根的二叉树的最小值 */
  const findMin = (root) => {};

  /* 计算以 root 为根的二叉树的节点和 */
  const findSum = (sum) => {};

  /* 判断以 root 为根的二叉树是否是 BST */
  const isBST = (root) => {};
}

{
  // 全局变量，记录 BST 最大节点之和
  let maxSum = 0;

  /* 主函数 */
  const maxSumBST = (root) => {
    traverse(root);
    return maxSum;
  };

  const traverse = (root) => {
    // base case
    if (root === null) {
      return [1, Infinity, -Infinity, 0];
    }

    // 递归计算左右子树
    let left = traverse(root.left);
    let right = traverse(root.right);

    /******* 后序遍历位置 *******/
    let res = [];
    // 这个 if 在判断以 root 为根的二叉树是不是 BST
    if (
      left[0] === 1 &&
      right[0] === 1 &&
      root.val > left[2] &&
      root.val < right[1]
    ) {
      // 以 root 为根的二叉树是 BST
      res[0] = 1;
      // 计算以 root 为根的这棵 BST 的最小值
      res[1] = Math.min(left[1], root.val);
      // 计算以 root 为根的这棵 BST 的最大值
      res[2] = Math.max(right[2], root.val);
      // 计算以 root 为根的这棵 BST 所有节点之和
      res[3] = root.val + left[3] + right[3];
      // 更新全局变量
      maxSum = Math.max(maxSum, res[3]);
    } else {
      // 以 root 为根的二叉树不是 BST
      res[0] = 0;
      // 其他的值都没必要计算了，因为用不到
    }
    /**************************/

    return res;
  };

  const root = {
    val: 7,
    left: {
      val: 4,
      left: {
        val: 2,
        left: {
          val: 1,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        val: 5,
        left: null,
        right: null,
      },
    },
    right: {
      val: 8,
      left: null,
      right: null,
    },
  };
  maxSumBST(root);
  console.log('===>maxSum', maxSum);
}

{
  const sort = (nums) => {
    let n = nums.length;
    traverse(nums, 0, n - 1);

    return nums;
  };

  const traverse = (nums, lo, hi) => {
    if (lo >= hi) {
      return;
    }

    // 对 nums[lo..hi] 进行切分
    // 使得 nums[lo..p-1] <= nums[p] < nums[p+1..hi]
    let p = partition(nums, lo, hi);
    traverse(nums, lo, p - 1);
    traverse(nums, p + 1, hi);
  };

  // 对 nums[lo..hi] 进行切分
  const partition = (nums, lo, hi) => {
    let pivot = nums[lo];
    // 关于区间的边界控制需格外小心，稍有不慎就会出错
    // 我这里把 i, j 定义为开区间，同时定义：
    // [lo, i) <= pivot；(j, hi] > pivot
    // 之后都要正确维护这个边界区间的定义
    let i = lo + 1;
    let j = hi;
    // 当 i > j 时结束循环，以保证区间 [lo, hi] 都被覆盖
    while (i <= j) {
      while (i < hi && nums[i] <= pivot) {
        i++;
        // 此 while 结束时恰好 nums[i] > pivot
      }
      while (j > lo && nums[j] > pivot) {
        j--;
        // 此 while 结束时恰好 nums[j] <= pivot
      }
      // 此时 [lo, i) <= pivot && (j, hi] > pivot
      if (i >= j) {
        break;
      }

      // 原地交换数组中的两个元素
      let temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
    }
    // 将 pivot 放到合适的位置，即 pivot 左边元素较小，右边元素较大
    let temp = nums[lo];
    nums[lo] = nums[j];
    nums[j] = temp;

    return j;
  };

  console.log('======>sort', sort([1, 3, 2, 5, 8, 4]));
}

{
  const findKthLargest = (nums, k) => {
    let lo = 0;
    let hi = nums.length - 1;
    // 转化成「排名第 k 的元素」
    k = nums.length - k;
    while (lo <= hi) {
      // 在 nums[lo..hi] 中选一个分界点
      let p = partition(nums, lo, hi);
      if (p < k) {
        // 第 k 大的元素在 nums[p+1..hi] 中
        lo = p + 1;
      } else if (p > k) {
        // 第 k 大的元素在 nums[lo..p-1] 中
        hi = p - 1;
      } else {
        // 找到第 k 大元素
        return nums[p];
      }
    }
    return -1;
  };

  // 对 nums[lo..hi] 进行切分
  const partition = (nums, lo, hi) => {
    let pivot = nums[lo];
    // 关于区间的边界控制需格外小心，稍有不慎就会出错
    // 我这里把 i, j 定义为开区间，同时定义：
    // [lo, i) <= pivot；(j, hi] > pivot
    // 之后都要正确维护这个边界区间的定义
    let i = lo + 1;
    let j = hi;
    // 当 i > j 时结束循环，以保证区间 [lo, hi] 都被覆盖
    while (i <= j) {
      while (i < hi && nums[i] <= pivot) {
        i++;
        // 此 while 结束时恰好 nums[i] > pivot
      }
      while (j > lo && nums[j] > pivot) {
        j--;
        // 此 while 结束时恰好 nums[j] <= pivot
      }
      // 此时 [lo, i) <= pivot && (j, hi] > pivot
      if (i >= j) {
        break;
      }

      // 原地交换数组中的两个元素
      swap(nums, i, j);
    }
    // 将 pivot 放到合适的位置，即 pivot 左边元素较小，右边元素较大
    swap(nums, lo, j);

    return j;
  };

  // 原地交换数组中的两个元素
  const swap = (nums, i, j) => {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  };

  console.log('======>sort', findKthLargest([1, 3, 2, 5, 8, 4], 4));
}
