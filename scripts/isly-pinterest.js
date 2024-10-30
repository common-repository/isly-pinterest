(function() {
  var $, IslyPinterest;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $ = window.jQuery;
  window.ISLY = {
    'IslyPinterest': null
  };
  window.ISLY.IslyPinterest = IslyPinterest = (function() {
    function IslyPinterest(options) {
      this.removePin = __bind(this.removePin, this);      this.permalinkClass = options.permalinkClass || '.isly-pinterest-permalink';
      this.minHeight = options.minHeight || 100;
      this.verticalOffset = options.verticalOffset || 0;
      this.horizontalOffset = options.horizontalOffset || 0;
      this.contentContainers = [];
      this.pin = $(document.createElement('a')).attr({
        'id': 'isly-pinterest-pin',
        'title': 'Pin It!',
        'target': '_blank'
      });
      this.build();
    }
    IslyPinterest.prototype.build = function() {
      var permalink, _i, _len, _ref;
      $(document.body).append(this.pin);
      this.window = $(window);
      this.permalinks = $(this.permalinkClass);
      _ref = this.permalinks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        permalink = _ref[_i];
        this.findContainer(permalink);
      }
      this.setListeners();
      return this.pin.hover(function() {
        return $(this).show();
      }, function() {
        return $(this).hide();
      });
    };
    IslyPinterest.prototype.findContainer = function(permalink) {
      var container;
      permalink = $(permalink);
      container = {
        permalink: permalink,
        entry: permalink.parent(),
        description: permalink.attr('data-description'),
        images: []
      };
      container.images = container.entry.find('img');
      return this.contentContainers.push(container);
    };
    IslyPinterest.prototype.setListeners = function() {
      var entry, image, _i, _len, _ref, _results;
      _ref = this.contentContainers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        _results.push((function() {
          var _j, _len2, _ref2, _results2;
          _ref2 = entry.images;
          _results2 = [];
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            image = _ref2[_j];
            _results2.push(this.setListener(image, entry));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };
    IslyPinterest.prototype.setListener = function(image, entry) {
      var permalink, that;
      that = this;
      image = $(image);
      permalink = entry.permalink.attr('href');
      if (image.height() > this.minHeight) {
        image.bind('mouseenter', function() {
          return that.setPin(image, entry);
        });
        return image.bind('mouseleave', function() {
          return that.removePin();
        });
      }
    };
    IslyPinterest.prototype.setPin = function(image, entry) {
      var pinItLink, position, that;
      that = this;
      pinItLink = this.getPinItLink(image, entry);
      position = image.offset();
      this.pin.attr('href', pinItLink).css({
        top: position.top + this.verticalOffset,
        left: position.left + this.horizontalOffset,
        display: 'block'
      });
      return this.window.bind('resize', this.removePin);
    };
    IslyPinterest.prototype.removePin = function() {
      this.pin.hide();
      return this.window.unbind('resize', this.removePin);
    };
    IslyPinterest.prototype.getPinItLink = function(image, entry) {
      return 'http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(entry.permalink.attr('href')) + '&media=' + encodeURIComponent($(image).attr('src')) + '&description=' + encodeURIComponent(entry.description);
    };
    return IslyPinterest;
  })();
}).call(this);
