import { SharedoFetch } from "../plugin";

class SharedoTypesTree {
    static async load() {
        const tree = new SharedoTypesTree();

        await tree.load();
        return tree;
    }

    async load() {
        this.__tree = await SharedoFetch.get("/api/v2/public/types/tree");
        this.initialized = true;
    }

    isDerivedFrom(type, parentTypes) {
        if (!this.initialized) {
            throw new Error("Tree not initialized.");
        }

        for (const parentType of parentTypes) {
            const parent = this.find(parentType);

            if (parent) {
                const child = this.find(type, parent);

                if (child) {
                    return true;
                }
            }
        }

        return false;
    }

    find(systemName, parent = null) {
        if (!this.initialized) {
            throw new Error("Tree not initialized.");
        }

        if (parent) {
            for (const child of parent.children) {
                if (child.systemName === systemName) {
                    return child;
                }

                const result = this.find(systemName, child);
                if (result) {
                    return result;
                }
            }
        } else {
            for (const branch of this.__tree) {
                if (branch.systemName === systemName) {
                    return branch;
                }

                const result = this.find(systemName, branch);
                if (result) {
                    return result;
                }
            }
        }

        return null;
    }
}

export default SharedoTypesTree