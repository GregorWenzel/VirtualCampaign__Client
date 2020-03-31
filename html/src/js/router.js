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

router.route("/loading", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", loadingPage);
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

//--admin section routes--
router.route("/admin-hub", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", adminHubPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-accounts", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admAccountsPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-groups", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admGroupsPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-motif-types", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admMotifTypePage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-motif-types-edit", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admMotifTypeEdit);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/motifSelect-for-preview", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", motifPreviewSelectPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-audio", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admAudioPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-audio-edit", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admAudioEdit);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-products", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admProductsPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-open-prods", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admOpenProdsPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-finished-prods", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admFinishedProdsPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});



