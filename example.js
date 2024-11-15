let temp = null;

const isSubPath = (head, root) => {
         temp = head;

        return isSubPath1(head, root);
}



function isSubPath1(head, root) {

        if (root == null) {
            return false;
         }

        if (temp!= null && root.val == temp.val) {
            console.log(root.val)
            temp = temp.next;
        }

        if (temp == null) {
            return true;
        } 

        const leftSide = isSubPath1(head, root.left);
        const rightSide = isSubPath1(head, root.right);

        if(!leftSide && !rightSide) {
            console.log("left: "+ leftSide + " right: " + rightSide);
            
            temp = head;
            return false;
        }
        
        return true;
    }


   class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);

    }
}


   class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

// head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]

    const s = new TreeNode(2, new TreeNode(1));
    const left = new TreeNode(4, undefined, s);

    const r = new TreeNode(8, new TreeNode(1), new TreeNode(3));
    const t = new TreeNode(2, new TreeNode(6), r);
    const right = new TreeNode(4, t);
    const treeNode = new TreeNode(1, left, right);


    const head = new ListNode(4, new ListNode(2), new ListNode(8));
    console.log(isSubPath(head , treeNode));