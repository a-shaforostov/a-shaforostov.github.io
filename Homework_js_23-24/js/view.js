/*global define:true*/
/*global tmpl:true*/

define(["jquery", "model", "tmpl"], function ($, model, tmpl) {
    'use strict';
    
    return function View(model) {
        var self = this,
            friendBoxScr = $('#friend-box'),
            friendsScr = $('#friends');
        
        self.init = function () {
            $('body').append(tmpl(friendBoxScr.html()));
            self.friendsListEl = $('.fr-box__friends');
            
            self.elements = {
                addBtn: $('.fr-box__add-button'),
                listContainer: $('.fr-box__friends'),
                input: $('.fr-box__input')
            };
            
            self.updateFriends(model.data);
        };
        
        self.updateFriends = function (appData) {
            var list = tmpl(friendsScr.html(), {data: appData});
            self.elements.listContainer.html(list);
        };
        
        self.init();
    };
});