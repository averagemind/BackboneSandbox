Backbone.ModalView = Backbone.View.extend({

    name: "ModalView",
    modalMask: null,
    modalContainer: null,
    defaultOptions: {
		fadeInDuration: 150,
		fadeOutDuration: 150,
		showCloseButton: true,
		bodyOverflowHidden: false,
		setFocusOnFirstFormControl: true,
		targetContainer: document.body,
		slideFromAbove: false,
		slideFromBelow: false,
		slideDistance: 150,
		closeImageUrl: "../../Images/close-modal.png",
		closeImageHoverUrl: "../../Images/close-modal-hover.png",
		showModalAtScrollPosition: true,
		permanentlyVisible: false,
		backgroundClickClosesModal: true,
		pressingEscapeClosesModal: true,
		css: {
            "-webkit-box-shadow": "0px",
            "-moz-box-shadow": "0px",
            "box-shadow": "0px",
        }
	},

    showModalMask: function () {

        return this.ensureModalMask().fadeIn(this.options.fadeInDuration);
    },

    hideModalMask: function () {

        return this.modalMask.fadeOut(this.options.fadeOutDuration);
    },

    ensureModalContainer: function (target) {

        if (target != null) {

            // A target is passed in, we need to re-render the modal container into the target.
            if (this.modalContainer != null) {

                this.modalContainer.remove();
                this.modalContainer = null;
            }
        }

        if (this.modalContainer == null) {

            this.modalContainer =
                $("<div id='modalContainer'>")
                    .css({
                        "z-index": "99999",
                        "position": "relative",

                })
                .appendTo(target);
        }

        return this.modalContainer;
    },

    ensureModalMask: function () {

        this.modalMask = $("#modal-mask");

        if (this.modalMask.length == 0) {

            this.modalMask =
                $("<div id='modal-mask'>")
                    .css(
                        {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: $(window).height() - 1, // Span the full document height...
                            width: "100%", // ...and full width
                            opacity: 0.5, // Make it slightly transparent
                            backgroundColor: "#000",
                            "z-index": 99900
                        })
                    .appendTo(document.body)
                    .hide();
        }
        else {
            // Ensure the mask spans the whole document, screen may have been updated.
            this.modalMask.css(
                {
                    height: $(window).height() - 1, // Span the full document height...
                    width: "100%" // ...and full width
                });
        }

        return this.modalMask;
    },

    keyup: function (event) {

        if (event.keyCode == 27 && this.options.pressingEscapeClosesModal) {

            this.hideModal();
        }
    },

    click: function (event) {

        if (event.target.id == "modal-mask" && this.options.backgroundClickClosesModal) {

            this.hideModal();
        }
    },

    setFocusOnFirstFormControl: function () {

        var controls = $("input, select, email, url, number, range, date, month, week, time, datetime, datetime-local, search, color", $(this.el));
        if (controls.length > 0) {

            $(controls[0]).focus();
        }
    },

    hideModal: function () {

        this.trigger("closeModalWindow");

        this.hideModalMask();
        $(document.body).unbind("keyup", this.keyup);
        this.modalMask.unbind("click", this.click);

        if (this.options.bodyOverflowHidden === true) {

            $(document.body).css("overflow", this.originalBodyOverflowValue);
        }

        var container = this.modalContainer;
        $(this.modalContainer)
            .fadeOut(
                this.options.fadeOutDuration,
                function () {
                    container.remove();
                });
    },

    getCoordinate: function (coordinate, css) {

        if (typeof (css[coordinate]) !== "undefined") {

            var value = css[coordinate];
            delete css[coordinate];

            return value;
        }
    },

    recenter: function () {

		return this.recentre();
	},

    recentre: function () {

        var $el = $(this.el);
        var coords = {
            top: this.getCoordinate("top", this.options.css),
            left: this.getCoordinate("left", this.options.css),
            right: this.getCoordinate("right", this.options.css),
            bottom: this.getCoordinate("bottom", this.options.css),
            isEmpty: function () { return (this.top == null && this.left == null && this.right == null && this.bottom == null); }
        };

        var offsets = this.getOffsets();
        var centreY = $(window).height() / 2;
        var centreX = $(window).width() / 2;
        var modalContainer = this.modalContainer;
        var positionY = centreY - ($el.outerHeight() / 2);
        modalContainer.css({ "top": (positionY + offsets.y) + "px" });

        var positionX = centreX - ($el.outerWidth() / 2);
        modalContainer.css({ "left": (positionX + offsets.x) + "px" });

        return this;
    },

    getOffsets: function () {

        var offsetY = 0, offsetX = 0;
        if (this.options.showModalAtScrollPosition) {

            offsetY = $(document).scrollTop(),
            offsetX = $(document).scrollLeft()
        }

        return { x: offsetX, y: offsetY };
    },

    showModal: function (options) {

        this.defaultOptions.targetContainer = document.body;
        this.options = $.extend(true, {}, this.defaultOptions, options, this.options);

        if (this.options.permanentlyVisible) {

            this.options.showCloseButton = false;
            this.options.backgroundClickClosesModal = false;
            this.options.pressingEscapeClosesModal = false;
        }

        //Set the center alignment padding + border see css style
        var $el = $(this.el);

        var centreY = $(window).height() / 2;
        var centreX = $(window).width() / 2;
        var modalContainer = this.ensureModalContainer(this.options.targetContainer).empty();

        var coords = {

            top: this.getCoordinate("top", this.options.css),
            left: this.getCoordinate("left", this.options.css),
            right: this.getCoordinate("right", this.options.css),
            bottom: this.getCoordinate("bottom", this.options.css),
            isEmpty: function () { return (this.top == null && this.left == null && this.right == null && this.bottom == null); }
        };

        $el.css(this.options.css);

        this.showModalMask();
        this.keyup = _.bind(this.keyup, this);
        this.click = _.bind(this.click, this);
        $(document.body).keyup(this.keyup); // This handler is unbound in hideModal()
        this.modalMask.click(this.click); // This handler is unbound in hideModal()

        if (this.options.bodyOverflowHidden === true) {

            this.originalBodyOverflowValue = $(document.body).css("overflow");
            $(document.body).css("overflow", "hidden");
        }

        modalContainer
            .append($el);

        modalContainer.css({

            "opacity": 0,
            "position": "absolute",
            "z-index": 999999
        });

        var offsets = this.getOffsets();

        // Only apply default centre coordinates if no css positions have been supplied
        if (coords.isEmpty()) {

            var positionY = centreY - 250;
            if (positionY < 10) positionY = 10;

            // Overriding the coordinates with explicit values if they are passed in
            if (typeof (this.options.y) !== "undefined") {

                positionY = this.options.y;
            }
            else {

                positionY += offsets.y;
            }

            modalContainer.css({ "top": positionY + "px" });

            var positionX = centreX - ($el.outerWidth() / 2);
            // Overriding the coordinates with explicit values if they are passed in
            if (typeof (this.options.x) !== "undefined") {

                positionX = this.options.x;
            }
            else {

                positionX += offsets.x;
            }

            modalContainer.css({ "left": positionX + "px" });
        }
        else {

            if (coords.top != null) modalContainer.css({ "top": coords.top + offsets.y });
            if (coords.left != null) modalContainer.css({ "left": coords.left + offsets.x });
            if (coords.right != null) modalContainer.css({ "right": coords.right });
            if (coords.bottom != null) modalContainer.css({ "bottom": coords.bottom });
        }

        if (this.options.setFocusOnFirstFormControl) {

            this.setFocusOnFirstFormControl();
        }

        if (this.options.showCloseButton) {

            var view = this;
            var image =
                $("<a href='#' id='modalCloseButton'>&#160;</a>")
                    .css({
                        "position": "absolute",
                        "top": "15px",
                        "right": "10px",
                        "width": "30px",
                        "height": "30px",
                        "background": "transparent url(" + view.options.closeImageUrl + ") top left no-repeat",
                        "text-decoration": "none"
                    })
                    .appendTo(this.modalContainer)
                    .hover(
                        function () {
                            $(this).css("background-image", "url(" + view.options.closeImageHoverUrl + ") !important");
                        },
                        function () {
                            $(this).css("background-image", "url(" + view.options.closeImageUrl + ") !important");
                        })
                    .click(
                        function (event) {
                            event.preventDefault();
                            view.hideModal();
                        });
        }

        var animateProperties = { opacity: 1 };
        var modalOffset = modalContainer.offset();

        if (this.options.slideFromAbove) {

            modalContainer.css({ "top": (modalOffset.top - this.options.slideDistance) + "px" });
            animateProperties.top = coords.top;
        }

        if (this.options.slideFromBelow) {

            modalContainer.css({ "top": (modalOffset.top + this.options.slideDistance) + "px" });
            animateProperties.top = coords.top;
        }

        this.modalContainer.animate(animateProperties, this.options.fadeInDuration);

        return this;
    }
});
