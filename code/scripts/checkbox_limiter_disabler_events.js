(function(global, $, undefined){

  var events = $({});

  var CheckboxGroupController = function(view, options) {
    this.options = $.extend({
      max: 3
    }, options || {});

    this.view = $(view); 
    this.inputs = this.view.find('input'); 
    this.view.on( 'change', 'input', $.proxy(this.limit, this) );

    events.on( 'categorizations:clear', $.proxy(this.clear, this) );
    events.on( 'categorizations:enable', $.proxy(this.toggle, this, false) );
  };

  CheckboxGroupController.prototype = {
    limit: function() {
      var checked = this.inputs.filter(':checked').length >= this.options.max;
      this.toggle(checked);
    },

    toggle: function(disable) {
      this.inputs.filter(':not(:checked)').prop('disabled', disable);
    }, 

    clear: function() {
      this.inputs.prop('checked', false);
      this.toggle(true);
    }
  };

  new CheckboxGroupController('#categorizations');


  var CheckboxGroupDisabler = function(view) {
    this.view = $(view);
    this.input = this.view.find('input');

    this.view.on('change', 'input', $.proxy(this.disable, this) );
  };

  CheckboxGroupDisabler.prototype.disable = function() {
    this.input.prop('checked') ? events.trigger('categorizations:clear') : events.trigger('categorizations:enable');
  };

  new CheckboxGroupDisabler('#disabler');

})(window, jQuery);
