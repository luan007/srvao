var sock = io("/glue");

var shared = {
    def: {},
};

sock.on("def-relay", (d) => {
    shared.def = d;
});
sock.on("up-relay", (delta) => {
    try {
        if (delta.type == "value_changed") {
            shared.def[delta.path].value = delta.new_val;
            console.log('vl', delta);
        }
        else {
            console.log('ev', delta);
        }
    }
    catch (e) {
    }
});


sock.emit("req-sync")


new Vue({
    el: "#main",
    data: shared,
    methods: {
        cmd: (x) => {
            sock.emit("control", {
                type: "action",
                path: x.path,
                args: []
            })
        }
    }
})