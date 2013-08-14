(function () {

    var Profiles = {};
    window.Profiles = Profiles;

    $.get(getjspath() + "profilemodaltemplate.htm", function (templates) {

        $("body").append(templates);

        var template = function (name) {

            return Mustache.compile($("#" + name + "-template").html());
        };

        Profiles.Profile = Backbone.Model.extend({
        });

        Profiles.Profiles = Backbone.Collection.extend({

            model: Profiles.Profile,
            url: "/api/Profiles",
        });

        Profiles.IndexView = Backbone.View.extend({

            template: template("index"),

            initialize: function () {

                this.profiles = new Profiles.Profiles();
                this.profiles.on("all", this.render, this);
                this.profiles.fetch();
            },
            render: function () {

                this.$el.html(this.template(this));
                this.profiles.each(this.addProfile, this);
                return this;
            },
            addProfile: function (profile) {

                var view = new Profiles.IndexView.ProfileView({ model: profile });
                this.$(".profiles").append(view.render().el);
            }
        });

        Profiles.IndexView.ProfileView = Backbone.View.extend({

            template: template("profile"),

            events: {

                "click a": "popup"
            },

            render: function () {

                this.$el.html(this.template(this));
                return this;
            },

            firstName: function () { return this.model.get("firstName"); },
            lastName: function () { return this.model.get("lastName"); },
            email: function () { return this.model.get("email"); },
            position: function () { return this.model.get("position"); },
            organization: function () { return this.model.get("organization"); },

            popup: function (e) {

                e.preventDefault();
                e.stopPropagation();

                var view = new Profiles.ModalView({ model: this.model });
                view.render().showModal();
            }
        });

        Profiles.ModalView = Backbone.ModalView.extend({

            template: template("profilemodal"),

            render: function () {

                this.$el.html(this.template(this));
                var articles = this.model.get("journalArticles");
                if (articles != null) {

                    this.$el.append(this.addPublications(articles));
                }
                return this;
            },
            addPublications: function (publications) {

                var $dom = $("<ul></ul>");
                _.each(publications, function (model) {

                    $dom.append(this.addPublication(model));
                }, this);

                return $dom;
            },
            addPublication: function (publication) {

                var view = new Profiles.ModalView.PublicationView({ model: publication });
                return view.render().el;
            },

            firstName: function () { return this.model.get("firstName"); },
            lastName: function () { return this.model.get("lastName"); },
            email: function () { return this.model.get("email"); },
            position: function () { return this.model.get("position"); },
            organization: function () { return this.model.get("organization"); },
            papersPublished: function () { return this.model.get("papersPublished"); },
            articlecount: function () { return this.model.get("journalArticles") == null ? "No" : this.model.get("journalArticles").length; },
        });

        Profiles.ModalView.PublicationView = Backbone.View.extend({

            tagName: "li",
            template: template("publication"),

            initialize: function () {

                _.bindAll(this, "render");
            },
            render: function (event) {

                this.$el.html(this.template(this));
                return this;
            },

            journal: function () { return this.model.journal; },
            title: function () { return this.model.title; },
        });

        Profiles.Router = Backbone.Router.extend({

            initialize: function (options) {

                this.el = options.el
            },
            routes: {

                "": "index"
            },
            index: function () {

                var index = new Profiles.IndexView();
                this.el.empty();
                this.el.append(index.render().el);
            }
        });
    });

    Profiles.boot = function (container) {

        container = $(container);
        var router = new Profiles.Router({ el: container })
        Backbone.history.start();
    }
})()

