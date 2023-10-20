// app.js

// define our application and pull in ngRoute and ngAnimate
var contentApp = angular.module('contentApp', ['ngRoute', 'ngAnimate'])
.run(function($rootScope) {
    
    $.getJSON('../data/content.json', function(data) {
        $rootScope.itemData = data;
    });

});

// ROUTING ===============================================
contentApp.config( function($routeProvider) {

    $routeProvider

        // HOME/MAIN CONTENT
        .when('/', {
            templateUrl: '../partials/page-content.html',
            controller: 'mainController'
        })

        // ADD CONTENT
        .when('/add', {
            templateUrl: '../partials/page-add.html',
            controller: 'addController'
        })

        // NAME CONTENT
        .when('/name', {
            templateUrl: '../partials/page-name.html',
            controller: 'nameController'
        });

});

// CONTROLLERS ============================================
contentApp.controller('mainController', function($rootScope, $scope) {

    $scope.pageClass = 'page-content';

    // Truncate items
    $rootScope.itemData = _.each( $rootScope.itemData, function( item ){
        item.title = AT.truncateCopy( item.title );

        if ( item.type == 'gallery' ) {
            item.gallery = _.each( item.gallery, function( project ){
                project.project_title = AT.truncateCopy( project.project_title );
            });
        }
    });

    // Sort in order
    $rootScope.itemData = _.sortBy( $rootScope.itemData, 'order' );

    // Add to content part of array to make template work
    // todo: don't do this, instead use angular data binding
    $rootScope.itemData.content = $rootScope.itemData;

    var template =  '<ul class="list-content list-items" id="list-main">'+
                        '{{#content}}' +
                        '<li id="{{order}}" class="item-content item-{{type}} {{^enabled}}item-disabled{{/enabled}}">' +
                            '<div class="cell container-drag"><img src="../images/icon-drag.png"/></div>'+
                            '<div class="cell container-icon"><img class="img-svg" src="../images/icon-{{type}}.svg"/></div>' +
                            '<div class="cell container-title">' +
                                '<h2>{{title}}</h2>' +
                            '</div>'+
                            '<div class="cell container-toggle">' +
                                '<label class="switch">' + 
                                    '<input class="form-control" type="checkbox" {{#enabled}}checked="checked"{{/enabled}} id="activation" name="activation">' +
                                    '<div class="slider round"></div>'+
                                '</label>'+
                            '</div>'+
                            // If there is a gallery, create it
                            '{{#gallery.length}}' +
                            '<ul class="list-content list-gallery list-expanded">' +
                                '{{#gallery}}' +
                                    '<li class="{{^enabled}}item-disabled{{/enabled}}">'+
                                        '<div class="cell container-drag"><img src="../images/icon-drag.png"/></div>'+
                                        '<div class="cell container-icon"><img class="thumb" src="../images/{{thumb}}"/></div>' +
                                        '<div class="cell container-title">' +
                                            '<h3>{{project_title}}</h3>' +
                                        '</div>'+
                                        '<div class="cell container-toggle">' +
                                            '<label class="switch switch-small">' + 
                                                '<input class="form-control" type="checkbox" {{#enabled}}checked="checked"{{/enabled}} id="activation" name="activation">' +
                                                '<div class="slider round"></div>'+
                                            '</label>'+
                                        '</div>'+
                                    '</li>' +
                                '{{/gallery}}'+
                            '</ul>' +
                            '{{/gallery.length}}' +
                        '</li>'+
                        '{{/content}}'+
                    '</ul>';
    var html = Mustache.to_html(template, $rootScope.itemData.content );

    $('#content').html(html);

    AT.bindEventHandlers();

    AT.wireAccordion();

    $( "#list-main" ).sortable({
        handle: '.container-drag'
    });

    $('.list-gallery').each( function() {
        $(this).sortable({
          handle: '.container-drag'
        });
    });

    // Wire toggles
    $('.switch').each( function() {
        $(this).on('click', function(e) {
            var switchControl = $(this);
            var listItem = $(this).parent().parent();

            if ( switchControl.find('input').prop( 'checked') ) {
                listItem.removeClass('item-disabled');
            } else {
                listItem.addClass('item-disabled');
            }
        });
    });
});

// Add page controller
contentApp.controller('addController', function( $rootScope, $scope ) {
    $scope.pageClass = 'page-add';

    AT.bindEventHandlers();
});

// Name page controller
contentApp.controller('nameController', function( $rootScope, $scope, $location ) {

    $scope.pageClass = 'page-name';

    AT.bindEventHandlers();

    $( '#addcontent' ).submit(function( event ) {
        //console.log('all right');
        var newPage = {
            'type': 'page',
            'enabled':true,
            'order':1 // make new first
        }

        newPage.title = $(this).find('#addtitle').val();

        // Move order of all others
        $rootScope.itemData = _.each( $rootScope.itemData, function( item ){
            item.order = item.order + 1;
        });

        // Add new item
        $rootScope.itemData.push(newPage);

        // Go back to main page to display
        $location.path('/');
        $scope.$apply();

    });
});

