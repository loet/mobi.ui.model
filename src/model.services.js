angular.module('mobi.ui.model.services', [])


    .factory('ModelManager', ModelManager);

    /**
     * The <b>ModelManager</b> manages {@link Model}s.
     *
     * @constructor
     */
    function ModelManager($rootScope, $location, GUIDService, CONTEXT_TYPES, $log, DateService, _) {
        var modelsUpdateInterceptors = [];

        /**
         * @type {Model}
         */
        $rootScope.currentModel = undefined;

        $rootScope.$on('$routeChangeSuccess', function (angularEvent, current) {
            var tmpPath = false, demoPath = false, model = getCurrentModel();
            if (current && current.$$route && current.$$route.originalPath && current.$$route.originalPath.indexOf('/tmp') === 0) {
                tmpPath = true;
            }
            if (current && current.$$route && current.$$route.originalPath && current.$$route.originalPath.indexOf('/demo') === 0) {
                demoPath = true;
            }
            if (!tmpPath && !demoPath && current && current.$$route) {
                model.currentPath = {};
                model.currentPath.path = current.$$route.originalPath;
                model.currentPath.params = current.params;
            }

            //remove already displayed alerts (alerts are marked as 'displayed' in alert.tpl.html, see alert.markAsDisplayed())
//            AlertHandler.getAlerts().forEach(function (alert) {
//                if (alert.displayed) {
//                    AlertHandler.removeAlert(alert);
//                }
//            });
        });

        $rootScope.$on('currentOEChangeSuccess', function removeAllModelsAfterCurrentOEChange() {
            removeAllModels();
            $log.info('ModelManager: all models removed after current OE change');
        });


        function loadModels() {
            var modelsJSON, models;
            modelsJSON = localStorage.getItem('models');
            if (modelsJSON) {
                models = angular.fromJson(modelsJSON);
            } else {
                models = {};
            }
            return models;
        }

        function updateAllModels() {
            var models;
            models = loadModels();
            if ($rootScope.currentModel) {
                models[$rootScope.currentModel.correlationId] = $rootScope.currentModel;
            }

            modelsUpdateInterceptors.forEach(function (modelUpdateInterceptor) {
                modelUpdateInterceptor($rootScope.currentModel, models);
            });

            localStorage.setItem('models', angular.toJson(models));
        }

        function storeCurrentModel(newValue) {
            if (newValue) {
                localStorage.setItem('model', angular.toJson(newValue));
            }
        }

        $rootScope.$watch('currentModel', function (newValue) {
            storeCurrentModel(newValue);
            updateAllModels();
            $rootScope.$emit('modelChanged');
        }, true);

        /**
         * Returns $rootScope.currentModel.
         * --------------
         * <i>This function ALWAYS returns a {@link Model}:</i>
         * <li>If $rootScope.currentModel is undefined, this function tries to retrieve the current model from localStorage.
         * <li>If there is no model in the localStorage, a new model is created
         *
         * @returns {Model} $rootScope.currentModel
         */
        function getCurrentModel() {
            var fromLocalStorage;
            if (!$rootScope.currentModel) {
                fromLocalStorage = localStorage.getItem('model');
                if (fromLocalStorage) {
                    $rootScope.currentModel = angular.fromJson(fromLocalStorage);
                } else {
                    createNewModel();
                }
            }
            return $rootScope.currentModel;
        }

        function getContextDescription() {
            return getCurrentModel().contextDescription;
        }

        function createNewModel(contextDescription, contextType) {
            var models, prop, model, timestamp;
            $rootScope.currentModel = undefined;
            if (contextDescription) {
                if (!contextType || CONTEXT_TYPES[contextType] === undefined) {
                    throw 'CONTEXT_TYPE: ' + contextType + ' is not a valid CONTEXT_TYPE. See constant CONTEXT_TYPES';
                }
                $rootScope.currentModel = {};
                $rootScope.currentModel.correlationId = GUIDService.createGuid();
                $rootScope.currentModel.contextDescription = contextDescription;
                $rootScope.currentModel.contextType = contextType;
            } else {
                models = loadModels();
                for (prop in models) {
                    if (models.hasOwnProperty(prop)) {
                        model = models[prop];
                        if (model.correlationId && !model.contextDescription) {
                            $rootScope.currentModel = model;
                        }
                    }
                }
            }

            //if no default model found, create one (without contextType)
            if (!$rootScope.currentModel) {
                $rootScope.currentModel = {};
                $rootScope.currentModel.correlationId = GUIDService.createGuid();
            }

            timestamp = DateService.timestamp();
            $rootScope.currentModel.timestamp = timestamp;
            $rootScope.currentModel.created = timestamp;
            $rootScope.currentModel.settings = {};

            storeCurrentModel($rootScope.currentModel);
            updateAllModels();

            return getCurrentModel();
        }

        function getCorrelationIdForBusinessKey(businessKey) {
            var models = loadModels(), correlationId;
            correlationId = _.findKey(models, function (model) {
                return model.contextDescription && model.contextDescription.businessKey && model.contextDescription.businessKey === businessKey;
            });
            return correlationId;
        }

        function loadModel(correlationId) {
            var models = loadModels(), model = models[correlationId], actualPath, actualPathParams;
            if (model && model.currentPath) {
                actualPath = model.currentPath.path;
                actualPathParams = model.currentPath.params;
                if (actualPathParams) {
                    actualPath = constructPath(model.currentPath);
                }
            }
            loadModelWithPath(correlationId, actualPath);

        }

        function loadModelWithPath(correlationId, path) {
            var models = loadModels(), model = models[correlationId];
            if (model) {
                $rootScope.currentModel = model;
                //update timestamp of newly selected
                $rootScope.currentModel.timestamp = DateService.timestamp();
                storeCurrentModel($rootScope.currentModel);
                updateAllModels();
            }
            $location.url(path);
        }

        function removeModel(correlationId) {
            var models;
            if ($rootScope.currentModel && $rootScope.currentModel.correlationId === correlationId) {
                $rootScope.currentModel = undefined;
                localStorage.removeItem('model');
            }
            models = loadModels();
            models[correlationId] = undefined;
            localStorage.setItem('models', angular.toJson(models));
        }

        function removeCurrentModel() {
            var correlationId;
            correlationId = $rootScope.currentModel ? $rootScope.currentModel.correlationId : undefined;
            if (correlationId) {
                removeModel(correlationId);
            }

            $location.path('/tmp/contexts');
        }

        function getAllModels() {
            return loadModels();
        }

        // TODO: rowy 02.05.2014 should this not return an empty array instead of undefined?
        function getNamedModels() {
            var prop, models = getAllModels(), model, namedModelsArray;
            for (prop in models) {
                if (models.hasOwnProperty(prop)) {
                    model = models[prop];
                    if (model.correlationId && model.contextDescription) {
                        namedModelsArray = namedModelsArray || [];
                        namedModelsArray.push(model);
                    }
                }
            }
            if (namedModelsArray) {
                return namedModelsArray.sort(function (a, b) {
                    //return a.timestamp < b.timestamp;
                    return b.timestamp - a.timestamp;
                });
            }
        }

        function getTopModels() {
            var namedModels = getNamedModels();
            if (namedModels) {
                return namedModels.slice(0, 15);
            }
        }

        function hasNamedModels() {
            return getNamedModels() !== undefined;
        }

        function addModelsUpdateInterceptor(modelUpdateInterceptor) {
            modelsUpdateInterceptors.push(modelUpdateInterceptor);
        }

        function constructPath(rawPathAndParams) {
            var pattern, prop,
                constructedPath = (rawPathAndParams ? rawPathAndParams.path : '/'), //use default path
                params = (rawPathAndParams ? rawPathAndParams.params : null);
            if (params) {
                for (prop in params) {
                    if (prop === 'correlationId') {
                        constructedPath = constructedPath + '?correlationId=' + params[prop];
                    } else {
                        pattern = ':' + prop;
                        constructedPath = constructedPath.replace(pattern, params[prop]);
                    }
                }
            }
            return constructedPath;
        }

        function constructCurrentPath() {
            return constructPath(getCurrentModel().currentPath);
        }

        function removeAllModels() {
            localStorage.removeItem('models');
            localStorage.removeItem('model');
        }

        return {
            getCurrentModel: getCurrentModel,
            createNewModel: createNewModel,
            getContextDescription: getContextDescription,
            loadModel: loadModel,
            loadModelWithPath: loadModelWithPath,
            getCorrelationIdForBusinessKey: getCorrelationIdForBusinessKey,
            removeModel: removeModel,
            removeCurrentModel: removeCurrentModel,
            getAllModels: getAllModels,
            getNamedModels: getNamedModels,
            getTopModels: getTopModels,
            hasNamedModels: hasNamedModels,
            addModelsUpdateInterceptor: addModelsUpdateInterceptor,
            constructPath: constructPath,
            constructCurrentPath: constructCurrentPath,
            removeAllModels: removeAllModels
        };
    }

/**
 * DO NOT REMOVE THE COMMENTS BELOW. THEY SERVE AS TYPE INFORMATION AND ARE LINKED-TO FROM WITHIN OTHER JSDOC COMMENTS
 * ALL OVER OUR CODE BASE
 */
/**
 * A <b>Model</b> contains different units of work. Each model represents a different context, e.g. a different Schaden.
 * All locally (in the localStorage) available <b>models</b> are displayed in "Verlauf" in the top left menu item.
 *
 * A <b>Model</b> is primarily managed by the {@link ModelManager}, but it may be altered by other services, as well.
 * E.g. the PortalNavigator is responsible for managing the {@link navigationElements} stored inside each model.
 *
 * @class Model
 * @property {string} contextDescription
 * @property {string} contextType
 * @property {string} correlationId
 * @property {number} created
 * @property {number} timestamp
 * @property {Object} settings
 * @property {Object} ADMINISTRATION
 * @property {string} currentPath
 * @property {Object} schaden
 * @property {Object} validationInformation
 * @property {PORTAL_NAVIGATOR} PORTAL_NAVIGATOR
 *
 */
var dummy; dummy = undefined;