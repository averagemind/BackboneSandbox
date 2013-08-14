(function () {

    var ProfileModal = {};
    window.ProfileModal = ProfileModal;

    $.get(getjspath() + "profilemodaltemplate.htm", function (templates) {

        $("body").append(templates);

        var template = function (name) {

            return Mustache.compile($("#" + name + "-template").html());
        };

        ProfileModal.ModalView = Backbone.ModalView.extend({

            template: template("profilemodal"),

            render: function () {

                this.$el.html(this.template(this));
                var articles = this.model.journalArticles;
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

                var view = new ProfileModal.ModalView.PublicationView({ model: publication });
                return view.render().el;
            },

            firstName: function () { return this.model.firstName; },
            lastName: function () { return this.model.lastName; },
            email: function () { return this.model.email; },
            position: function () { return this.model.position; },
            organization: function () { return this.model.organization; },
            papersPublished: function () { return this.model.papersPublished; },
            articlecount: function () { return this.model.journalArticles == null ? "No" : this.model.journalArticles.length; },
        });

        ProfileModal.ModalView.PublicationView = Backbone.View.extend({

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
    });

    ProfileModal.boot = function (model) {

        var view = new ProfileModal.ModalView({ model: model });
        view.render().showModal();
    }
})()

