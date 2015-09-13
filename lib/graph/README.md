## Questions

- [ ] Should orphan nodes be allowed or not?

If they're allowed, then iterating over all keys/values necessarily implies 
going over the store object and not through node traversal.

- [ ] Should the iterator use a graph traversal or an object traversal?

This depends a lot on whether there are orphans allowed. If orphans are allowed 
and there need to be a way to access those orphans, then you need to traverse 
though the hash maps of keys in order to access all nodes. 

- [ ] Should there be more than one edge allowed per two nodes?

Currently, there is only one edge per node pair and that edge can only have 
one value. It seems you wouldn't really need anything else.

- [ ] When traversing the graph, how can I delete the reference to that traversal?

Currently, I save a callback to remove it that gets called after the traversal
is finished.
