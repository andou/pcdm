// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.VerticalFixedMenu = (function() {
    function VerticalFixedMenu(ref) {
      this.ref = ref;
      this.jumpToSection = __bind(this.jumpToSection, this);
      this.onScroll = __bind(this.onScroll, this);
      this.w = $('window');
      this.buttons = this.ref.find('.js-vertical-fixed-menu-items >li >a');
      this.sections_container = $('.js-vertical-fixed-menu-sections');
      this.sections = this.sections_container.find('>div');
      this.top = this.ref.css('top');
      this.threshold = this.sections_container.height() - this.ref.height();
      this.current_id = '';
      if (is_mobile) {
        this.ref.addClass('no-fixed');
        this.ref.css({
          top: '0px'
        });
        this.ref.find('nav.shop-nav').css({
          visibility: 'hidden'
        });
      }
      this.setInteractions();
    }

    VerticalFixedMenu.prototype.onScroll = function(val) {
      var btn, i, id, _i, _ref;
      if (!is_mobile) {
        if (val > this.threshold) {
          if (!this.ref.hasClass('no-fixed')) {
            this.ref.addClass('no-fixed');
            this.ref.css({
              top: "" + this.threshold + "px"
            });
          }
        } else {
          if (this.ref.hasClass('no-fixed')) {
            this.ref.removeClass('no-fixed');
            this.ref.css({
              top: this.top
            });
          }
        }
      }
      for (i = _i = 0, _ref = this.buttons.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        btn = $(this.buttons[i]);
        if (val >= this.getSectionTopByButton(btn)) {
          id = (btn.attr('href')).substring(1);
        }
      }
      if (id !== this.current_id) {
        this.current_id = id;
        return this.setButtonActive();
      }
    };

    VerticalFixedMenu.prototype.setInteractions = function() {
      return this.buttons.bind('click', this.jumpToSection);
    };

    VerticalFixedMenu.prototype.setButtonActive = function() {
      var btn, i, id, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.buttons.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        btn = $(this.buttons[i]);
        id = (btn.attr('href')).substring(1);
        if (id === this.current_id) {
          _results.push(btn.addClass('current'));
        } else {
          if (btn.hasClass('current')) {
            _results.push(btn.removeClass('current'));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    };

    VerticalFixedMenu.prototype.jumpToSection = function(e) {
      var btn, target_top;
      e.preventDefault();
      btn = $(e.currentTarget);
      if (!btn.hasClass('active')) {
        target_top = this.getSectionTopByButton(btn);
        if (target_top !== this.w.scrollTop()) {
          return TweenLite.to(window, 2, {
            scrollTo: {
              y: target_top
            },
            ease: Power4.easeInOut
          });
        }
      }
    };

    VerticalFixedMenu.prototype.getSectionTopByButton = function(btn) {
      var section_id, section_ref, section_top;
      section_id = (btn.attr('href')).substring(1);
      section_ref = $("#" + section_id);
      section_top = Math.floor(section_ref.offset().top - small_header_height + 1);
      if (section_id === $(this.sections[0]).attr('id')) {
        section_top = 0;
      }
      return section_top;
    };

    VerticalFixedMenu.prototype.getSectionTopById = function(id) {
      var section_ref, section_top;
      section_ref = $("#" + id);
      section_top = Math.floor(section_ref.offset().top - small_header_height + 1);
      if (id === $(this.sections[0]).attr('id')) {
        section_top = 0;
      }
      return section_top;
    };

    return VerticalFixedMenu;

  })();

}).call(this);
