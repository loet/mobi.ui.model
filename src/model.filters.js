angular.module('mobi.ui.model.filters', [])

    .filter('contextDescription', function () {
        return function (input) {
            var label;
            //default
            label = input;
            if (input && input.contextLabel) {
                label = input.contextLabel;
                if (input.contextParams && Array.isArray(input.contextParams) && input.contextParams.length > 0) {
                    label = label + ': ';
                    input.contextParams.forEach(function (param, index) {
                        label += param;
                        if (index < (input.contextParams.length - 1)) {
                            label += ', ';
                        }
                    });
                }
            }
            return label;
        };
    });
