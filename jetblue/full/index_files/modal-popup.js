var modalpopupjsLoaded = false;

var ModalPopup = {
    modalObj: null, sourceDOMNode: null,
    /*
     * This function sets popup modal title
     */
    _setModalTitle: function(ModalLabel) {
        $("#modal-title").text(ModalLabel);
    },
    /*
     * Any form within the modals will be handled by this function - currently only email form
     */
    _handleForm: function(jqtriggerID) {
        if (typeof window.emailmejsLoaded !== 'undefined') {
            EmailMe._populateEmailValues(jqtriggerID);
        } else {
            GlobalUtils.lazyLoad('email-me', true, true, EmailMe._populateEmailValues(jqtriggerID));
        }
    },
    _setModalHeader: function(jqtriggerID) {
        /**
         * In the HTML part -
         *
         * Modal component specific attributes:
         * attribute "data-b" - (optional) - will have the header title of the modal
         * attribute "data-s" - (required) - will have the ID of the target div on the page whose content needs to be pulled into the modal body
         *
         * Email functionality specific attributes:
         * attribute "data-e" - (optional) - will hold the email address that will be populated in the "Email Me" form
         * attribute "data-a" - (required) - will hold the type of email content, usually this is the name of the email method from Java backend, ex-
         *                                  for T&C emails - "sendEmail"
         *                                  for CMA emails - "sendCmaEmail"
         *                                  for generic email - "generic" - not implemented in java yet
         */

        /* Check if any existing Modal is visible on page if exists, clear it up */
        if ($("#modal-dialog").length && $("#modal-dialog").is(':visible')) {
            $("#modal-title").empty();
            $("#modal-body").empty();
            $("#modal-body").css("height", "");
        }

        /* Set the modal title - attribute "data-b" will have the header title of the modal */
        if ($(jqtriggerID).data("b") !== null && $(jqtriggerID).data("b") !== "" && typeof $(jqtriggerID).data("b") !== 'undefined') {
            ModalPopup._setModalTitle($(jqtriggerID).data("b"));
        } else {
            /* positioning the close button when the modal title does not exist */
            $(".modal-header .close").css("margin-top", "-15px");
        }
    },
    _setRegularModals: function(jqtriggerID) {
        if ($(jqtriggerID).data("s") !== null && $(jqtriggerID).data("s") !== "" && typeof $(jqtriggerID).data("s") !== 'undefined') {
            var targetedID = "#" + $(jqtriggerID).data("s");

            /* If its an form modal (for example emailMe), detach and later reattach source DOM node, so input field conflicts dont occur */
            if ($(jqtriggerID).data("a") !== null && typeof $(jqtriggerID).data("a") !== 'undefined') {
                ModalPopup.sourceDOMNode = $(targetedID).detach();
                $("#modal-body").append($(ModalPopup.sourceDOMNode).html());
                ModalPopup._handleForm(jqtriggerID);
            } else if ($(jqtriggerID).data("u") !== null && typeof $(jqtriggerID).data("u") !== 'undefined') {
                var link = $(jqtriggerID).data("u");
                var tncFrame = targetedID + ' iframe';
                $(tncFrame).attr('src', link);
                $("#modal-body").append($(targetedID).html());

                /* below if condition hide Tnc scrill on landing pages*/
                if((document.body.clientWidth>1024)&&($(jqtriggerID).data("u"))){
                    $("#modal-body").css('overflow-y', 'hidden');
                }else{
                    $("#modal-body").css('overflow-y', 'auto');
                }
            } else {
                $("#modal-body").append($(targetedID).html());
            }
        }
    },
    _setModalBody: function(isTriggeredModal, jqtriggerID, triggerID) {
        if (!isTriggeredModal) {
            /* reference for identifying nature of modal content usage of this can be seen in the session-timeout.js */
            $("#modalSkeleton").removeClass().addClass(triggerID);
            $("#modal-body").append($(jqtriggerID).html());


        } else {
            ModalPopup._setRegularModals(jqtriggerID);
        }
    },
    _setModalFooter: function(displayClose) {
        /* Display or hide the close button */
        if (!displayClose) {
            $("#modal-close").hide();
        } else {
            $("#modal-close").show();
        }
    },
    /**
     * This function creates, populates with content and opens the popup modal
     *
     * @param {type} triggerID - if isTriggeredModal=true, this will be the ID of the popup modal trigger(link/button/span)
     *                         - if isTriggeredModal=false, this will be the ID of the targeted popup modal hidden body content
     *
     * @param {type} isTriggeredModal - true (if modal invoked by clicking a link/button) or false (if modal invoked automatically for ex. timeout scenarios)
     *
     * @param {type} displayClose - true (show the close "x" icon) or false (hide the close "x" icon)
     *
     * @returns {undefined}
     */
    _openModal: function(triggerID, isTriggeredModal, displayClose) {
        /* Start populating the new modal content */

        var jqtriggerID = "#" + triggerID;

        ModalPopup._setModalHeader(jqtriggerID);

        ModalPopup._setModalBody(isTriggeredModal, jqtriggerID, triggerID);

        ModalPopup._setModalFooter(displayClose);

        /* Show/reveal the modal component on screen */
        $("#modal-title").show();
        $("#modal-body").show();
        $("#modal-backdrop").show();
        $("#modal-dialog").show();

        /* for ADA */
        $(".modal-content").attr("aria-hidden", "false");
        $(".modal-content").attr("tabIndex", "-1");
        $(".modal-content").focus();

        ModalPopup._modalPosition();
    },
    /*
     * This function sets the modal position
     */
    _modalPosition: function() {
        $(".modal-body").css("max-height", 375);
        var windowHeight = $(window).height();
        var modalHeight = $('.modal-content').height();
        var marginTop = Math.round((windowHeight - modalHeight) / 3);
        if (marginTop <= 0) {
            marginTop = 0;
            $(".modal-body").css("max-height", $(window).height() - ($(".modal-content").height() - 355));
        }
        else {
            $(".modal-body").css("max-height", 375);
        }

        $('.modal-dialog').css('top', marginTop);
    },
    /*
     * Conditionally closing/un-closing modal on scroll or backdrop/overlay click for modals like "about-to-timeout", "timed-out" and "processing"
     */
    _conditionallyCloseModalOnBackdropClick: function() {
        var modalSkeletonNode = $("#modalSkeleton");
        if (modalSkeletonNode.hasClass("timeoutModal") || modalSkeletonNode.hasClass("processingModal") || modalSkeletonNode.hasClass("emailSuccessModal") || modalSkeletonNode.hasClass("emailFailureModal")) {
            return;
        } else if (modalSkeletonNode.hasClass("aboutToTimeoutModal")) {
            SessionTimeout._clearTimeout();
            return;
        } else {
            ModalPopup._closeModal();
        }
    },
    /*
     * This function handles closing of the modal
     */
    _closeModal: function() {
        /* hide the modal and the grey backdrop */
        $("#modal-dialog").hide();
        $("#modal-backdrop").hide();
        $("#modal-title").hide();
        $("#modal-body").hide();

        /* To reset all the custom styles added previously once we close the modal */
        $("#modalSkeleton").removeClass();
        $(".modal-header .close").removeAttr('style');

        $('.modal-body').css('overflow','auto');
        /* empty the content of modal title and body */
        $("#modal-title").empty();
        $("#modal-body").empty();


        /* for ADA */
        $(".modal-content").attr("aria-hidden", "true");
        $(".modal-content").blur();
        $('html').removeClass("no-scroll");

        /* if its an email me form modal, reattach the sourcenode to DOM */
        if (ModalPopup.sourceDOMNode) {
            $(ModalPopup.sourceDOMNode).appendTo("#applicationForm");
            ModalPopup.sourceDOMNode = null;
        }
    },
    /* This function gets called for all click triggered modals */
    triggerModalPopup: function(e) {
        e.preventDefault();
        var triggerID = $(e.target).attr('id');
        ModalPopup._openModal(triggerID, true, true);
    },
    _executeOnReady: function() {
        $("body").on("click", ".modalpopupTrigger", ModalPopup.triggerModalPopup);

        $("body").on("click", "#modal-close", ModalPopup._closeModal);

        $("body").on("scroll", ModalPopup._closeModal);

        $('#modal-backdrop').on('click', ModalPopup._conditionallyCloseModalOnBackdropClick);

        $(window).resize(function() {
            ModalPopup._modalPosition();
        });

        modalpopupjsLoaded = true;
    }

};

$(document).ready(ModalPopup._executeOnReady);