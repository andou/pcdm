// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.RailsShifter = (function() {
    function RailsShifter(ref) {
      this.ref = ref;
      this.onResize = __bind(this.onResize, this);
      this.onScroll = __bind(this.onScroll, this);
      this.onImageLoaded = __bind(this.onImageLoaded, this);
      this.rail_1 = this.ref.find('.rail-1');
      this.rail_2 = this.ref.find('.rail-2');
      this.rail_1_el = this.rail_1.find('.creative-vision');
      this.rail_2_el = this.rail_2.find('.the-designer');
      this.images = this.ref.find('img');
      this.images_tot = this.images.length;
      this.images_loaded = 0;
      this.top = this.rail_1.offset().top;
      this.is_enabled = false;
      this.preloadImages();
    }

    RailsShifter.prototype.preloadImages = function() {
      var i, image, preloader, src, _i, _ref, _results;
      event_emitter.addListener('IMAGE_LOADED', this.onImageLoaded);
      _results = [];
      for (i = _i = 0, _ref = this.images_tot; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        image = $(this.images[i]);
        src = image.attr('src');
        preloader = new Image();
        preloader.onload = this.onImageLoaded;
        _results.push(preloader.src = src);
      }
      return _results;
    };

    RailsShifter.prototype.onImageLoaded = function() {
      this.images_loaded++;
      if (this.images_loaded === this.images_tot) {
        this.resetBreakpoints();
        return this.is_enabled = true;
      }
    };

    RailsShifter.prototype.resetBreakpoints = function() {
      this.breakpoint_1 = this.rail_2_el.offset().top + .5 * this.rail_2_el.height();
      this.breakpoint_2 = this.rail_1_el.offset().top - window.small_header_height;
      return this.acc = this.breakpoint_2 / (this.breakpoint_2 - this.breakpoint_1);
    };

    RailsShifter.prototype.onScroll = function(val) {
      if (this.is_enabled) {
        if (val > this.breakpoint_1) {
          if (!this.rail_1.hasClass('more-affracchievole')) {
            this.rail_1.addClass('more-affracchievole');
          }
          if (val < this.breakpoint_2) {
            return this.rail_1.css({
              top: "" + (val - this.acc * (val - this.breakpoint_1)) + "px"
            });
          }
        } else {
          if (this.rail_1.hasClass('more-affracchievole')) {
            this.rail_1.removeClass('more-affracchievole');
            return this.rail_1.css({
              top: "" + this.top + "px"
            });
          }
        }
      }
    };

    RailsShifter.prototype.onResize = function() {
      if (this.is_enabled) {
        return this.resetBreakpoints();
      }
    };

    return RailsShifter;

  })();

}).call(this);
