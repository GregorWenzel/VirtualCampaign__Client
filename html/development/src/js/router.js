var router = new kendo.Router({
    routeMissing: function(e){
        console.log('404');
        router.navigate("/page404");
    },
    change: function(e){
        console.log(e.url);
    }
});
router.route("/", function() {
    layout.showIn("#page", loginPage );
});

router.route("/login", function() {
    layout.showIn("#page", loginPage);
});

router.route("/hub", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", hubPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/myproductions", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", prodListPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/production", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", productionPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/motifs", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", motifsPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/motifSelect", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", motifsSelectPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/prodCollection", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", prodColPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/statistics", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", statisticsPage);
    } else {
        router.navigate("/login");
    };
});

router.route("/logout", function() {
    layout.showIn("#page", logoutPage);
});

router.route("/page404", function() {
    layout.showIn("#page", page404);
});
