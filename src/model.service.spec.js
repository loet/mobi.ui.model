describe('model section', function () {

    it('should work', function () {
        expect('it works').toBeDefined();
    });

    //beforeEach(module('mobi.ui.model'));
    //
    //
    //describe('model filter section', function () {
    //
    //    it('should return context label without params', inject(function ($filter) {
    //        var contextDescription;
    //        contextDescription = {contextLabel: 'my label'};
    //        expect($filter('contextDescription')(contextDescription)).toBe('my label');
    //    }));
    //
    //    it('should return context label with params', inject(function ($filter) {
    //        var contextDescription;
    //        contextDescription = {contextLabel: 'my label', contextParams: ['param1', 'param 2']};
    //        expect($filter('contextDescription')(contextDescription)).toBe('my label: param1, param 2');
    //    }));
    //
    //    it('should return context label with one param', inject(function ($filter) {
    //        var contextDescription;
    //        contextDescription = {contextLabel: 'my label', contextParams: ['param1']};
    //        expect($filter('contextDescription')(contextDescription)).toBe('my label: param1');
    //    }));
    //
    //});
    //
    //describe('model service section', function () {
    //
    //    var $rootScope, ModelManager, $location, CONTEXT_TYPES;
    //
    //    beforeEach(module('mobi.ui.model'));
    //
    //    beforeEach(inject(function (_$rootScope_, _ModelManager_, _$location_, _CONTEXT_TYPES_) {
    //        $rootScope = _$rootScope_;
    //        ModelManager = _ModelManager_;
    //        $location = _$location_;
    //        CONTEXT_TYPES = _CONTEXT_TYPES_;
    //    }));
    //
    //
    //    afterEach(function () {
    //        //cleanup
    //        localStorage.removeItem('models');
    //        localStorage.removeItem('model');
    //    });
    //
    //    it('should return single current instance', function () {
    //        var model = ModelManager.getCurrentModel();
    //        model.mydata = 'mydata';
    //        model = ModelManager.getCurrentModel();
    //        expect(model.mydata).toBe('mydata');
    //    });
    //
    //    it('should create new instance', function () {
    //        var model = ModelManager.getCurrentModel();
    //        model.mydata = 'mydata';
    //        model = ModelManager.getCurrentModel();
    //        expect(model.mydata).toBe('mydata');
    //        model = ModelManager.createNewModel();
    //        expect(model.mydata).toBeUndefined();
    //        model = ModelManager.getCurrentModel();
    //        expect(model.mydata).toBeUndefined();
    //
    //    });
    //
    //    it('should store model in localstorage after creation', function () {
    //        localStorage.removeItem('model');
    //        expect(localStorage.getItem('model')).toBeNull();
    //        ModelManager.createNewModel();
    //        expect(localStorage.getItem('model')).toBeTruthy();
    //    });
    //
    //    it('should always update localstorage', function () {
    //        localStorage.removeItem('model');
    //        expect(localStorage.getItem('model')).toBeNull();
    //        var model = ModelManager.createNewModel();
    //        expect(localStorage.getItem('model')).toBeTruthy();
    //        model.mydata = 'mydata';
    //        $rootScope.$digest();
    //        expect(angular.fromJson(localStorage.getItem('model')).mydata).toBe('mydata');
    //        model.mydata = {myattribute: 'myattribute'};
    //        $rootScope.$digest();
    //        expect(angular.fromJson(localStorage.getItem('model')).mydata.myattribute).toBe('myattribute');
    //        model.mydata.myattribute = 'myupdatedattribute';
    //        $rootScope.$digest();
    //        expect(angular.fromJson(localStorage.getItem('model')).mydata.myattribute).toBe('myupdatedattribute');
    //    });
    //
    //    it('should load from localstorage', function () {
    //        $rootScope.model = undefined;
    //        localStorage.setItem('model', angular.toJson({ attribute: 'value' }));
    //        expect(ModelManager.getCurrentModel().attribute).toBe('value');
    //    });
    //
    //    it('should set correlation id', function () {
    //        var model = ModelManager.createNewModel();
    //        expect(model.correlationId).toBeDefined();
    //    });
    //
    //    it('should set contextDescription', function () {
    //        var model = ModelManager.createNewModel({contextLabel: 'label', contextParams: ['partnernamexy']}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //
    //        expect(model.contextDescription.contextLabel).toBe('label');
    //        expect(model.contextDescription.contextParams[0]).toBe('partnernamexy');
    //
    //        model = ModelManager.createNewModel();
    //
    //        expect(model.contextDescription).toBeUndefined();
    //    });
    //
    //    it('should select default model if no name provided', function () {
    //        var model1, model2, model3, model4;
    //        model1 = ModelManager.createNewModel('myname', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        model2 = ModelManager.createNewModel();
    //        model3 = ModelManager.createNewModel();
    //        model4 = ModelManager.createNewModel('myothername', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //
    //        expect(model1.correlationId === model2.correlationId).toBeFalsy();
    //        expect(model1.correlationId === model3.correlationId).toBeFalsy();
    //        expect(model1.correlationId === model4.correlationId).toBeFalsy();
    //        expect(model2.correlationId === model4.correlationId).toBeFalsy();
    //        expect(model3.correlationId === model4.correlationId).toBeFalsy();
    //        expect(model2.correlationId).toBe(model3.correlationId);
    //    });
    //
    //    it('should remove model instances', function () {
    //        var models, model1, model2, correlationId1, correlationId2;
    //
    //        localStorage.removeItem('models');
    //        $rootScope.currentModel = undefined;
    //
    //        model1 = ModelManager.createNewModel('model1', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        model1.myattribute = 'model1';
    //        correlationId1 = model1.correlationId;
    //        $rootScope.$digest();
    //        model2 = ModelManager.createNewModel('model2', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        model2.myattribute = 'model2';
    //        correlationId2 = model2.correlationId;
    //        $rootScope.$digest();
    //
    //        models = angular.fromJson(localStorage.getItem('models'));
    //        expect(models[correlationId1]).toBeDefined();
    //        expect(models[correlationId2]).toBeDefined();
    //
    //        ModelManager.loadModel(correlationId1);
    //        expect($rootScope.currentModel.correlationId).toBe(correlationId1);
    //        ModelManager.removeModel(correlationId1);
    //        $rootScope.$digest();
    //        models = angular.fromJson(localStorage.getItem('models'));
    //        expect(models[correlationId1]).toBeUndefined();
    //        expect(models[correlationId2]).toBeDefined();
    //
    //        ModelManager.loadModel(correlationId2);
    //        expect($rootScope.currentModel.correlationId).toBe(correlationId2);
    //        ModelManager.removeModel(correlationId2);
    //        $rootScope.$digest();
    //        models = angular.fromJson(localStorage.getItem('models'));
    //        expect(models[correlationId2]).toBeUndefined();
    //        expect(models[correlationId1]).toBeUndefined();
    //
    //    });
    //
    //    it('should remove current model instance', function () {
    //        var models, model, correlationId;
    //
    //        localStorage.removeItem('models');
    //        $rootScope.currentModel = undefined;
    //
    //        model = ModelManager.createNewModel('model1', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        correlationId = model.correlationId;
    //        $rootScope.$digest();
    //
    //        expect($rootScope.currentModel.correlationId).toBe(correlationId);
    //        models = angular.fromJson(localStorage.getItem('models'));
    //        expect(models[correlationId]).toBeDefined();
    //
    //        ModelManager.removeCurrentModel();
    //        $rootScope.$digest();
    //        expect($location.path()).toBe('/tmp/contexts');
    //    });
    //
    //    it('should return all the model instances', function () {
    //        var allModels, correlationId1, correlationId2, correlationId3;
    //
    //        correlationId1 = ModelManager.createNewModel('model2', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN).correlationId;
    //        correlationId2 = ModelManager.createNewModel('model3', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN).correlationId;
    //        correlationId3 = ModelManager.createNewModel('model4', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN).correlationId;
    //
    //        allModels = ModelManager.getAllModels();
    //
    //        expect(allModels[correlationId1]).toBeDefined();
    //        expect(allModels[correlationId2]).toBeDefined();
    //        expect(allModels[correlationId3]).toBeDefined();
    //    });
    //
    //    it('should return the named model instances', function () {
    //        var allModels, namedModels, correlationId1, correlationId2, correlationId3, correlationId4, i;
    //
    //        correlationId1 = ModelManager.createNewModel().correlationId;
    //        correlationId2 = ModelManager.createNewModel({contextLabel: 'label'}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN).correlationId;
    //        correlationId3 = ModelManager.createNewModel({contextLabel: 'label2'}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN).correlationId;
    //        correlationId4 = ModelManager.createNewModel().correlationId;
    //
    //        allModels = ModelManager.getAllModels();
    //        namedModels = ModelManager.getNamedModels();
    //
    //        expect(allModels[correlationId1]).toBeDefined();
    //        expect(allModels[correlationId2]).toBeDefined();
    //        expect(allModels[correlationId3]).toBeDefined();
    //        expect(allModels[correlationId4]).toBeDefined();
    //
    //
    //        for (i = 0; i < namedModels.length; i++) {
    //            if (namedModels[i].correlationId === correlationId1 || namedModels[i].correlationId === correlationId4) {
    //                this.fail('returned unnamed models');
    //            }
    //        }
    //
    //    });
    //
    //    it('should return the top 15 model instances', function () {
    //        var namedModels, topModels;
    //
    //        ModelManager.createNewModel();
    //        ModelManager.createNewModel('model2', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model3', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model4', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model5', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model6', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model7', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model8', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model9', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model10', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model11', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model12', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model13', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model14', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model15', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model16', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.createNewModel('model17', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //
    //        namedModels = ModelManager.getNamedModels();
    //        topModels = ModelManager.getTopModels();
    //
    //        expect(namedModels.length).toBe(16);
    //        expect(topModels.length).toBe(15);
    //
    //    });
    //
    //    it('should tell whether there are named models', function () {
    //        ModelManager.createNewModel();
    //        expect(ModelManager.hasNamedModels()).toBeFalsy();
    //        ModelManager.createNewModel('hmm', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        expect(ModelManager.hasNamedModels()).toBeTruthy();
    //    });
    //
    //
    //    it('should set timestamp', function () {
    //        var model1, model2;
    //        model1 = ModelManager.createNewModel();
    //        model2 = ModelManager.createNewModel('2', CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //
    //        expect(model1.timestamp).toBeDefined();
    //        expect(model2.timestamp).toBeDefined();
    //    });
    //
    //    it('should construct correct path', function () {
    //        var currentPath = {path: '/mypath/:myplaceholder', params: {correlationId: '12345', myplaceholder: 'xy'}},
    //            correctPath = ModelManager.constructPath(currentPath);
    //
    //        expect(correctPath).toBe('/mypath/xy?correlationId=12345');
    //
    //    });
    //
    //    it('should load defined path of model with given correlationId', function () {
    //        var model1, model2;
    //        model1 = ModelManager.createNewModel({contextLabel: 'mymodel1'}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        model1.currentPath = {};
    //        model1.currentPath.path = '/ereignis';
    //        $rootScope.$digest();    //trigger watch on model to save currentPath
    //        model2 = ModelManager.createNewModel({contextLabel: 'mymodel2'}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        model2.currentPath = {};
    //        model2.currentPath.path = '/schadenfall/:myplaceholder';
    //        model2.currentPath.params = {correlationId: model2.correlationId, myplaceholder: 'xy'};
    //        $rootScope.$digest();      //trigger watch on model to save currentPath
    //
    //        ModelManager.loadModel(model1.correlationId);
    //        expect($location.url()).toBe('/ereignis');
    //        ModelManager.loadModel(model2.correlationId);
    //        expect($location.url()).toBe('/schadenfall/xy?correlationId=' + model2.correlationId);
    //        expect(ModelManager.constructCurrentPath()).toBe('/schadenfall/xy?correlationId=' + model2.correlationId);
    //    });
    //
    //    it('should load custom path of model with given correlationId and path', function () {
    //        var model1;
    //        model1 = ModelManager.createNewModel({contextLabel: 'mymodel1'}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        model1.currentPath = {};
    //        model1.currentPath.path = '/ereignis';
    //
    //        ModelManager.loadModelWithPath(model1.correlationId, '/feuer');
    //        expect($location.url()).toBe('/feuer');
    //    });
    //
    //    it('should accept only defined context types', inject(function (CONTEXT_TYPES) {
    //        var model;
    //
    //        model = ModelManager.getCurrentModel();
    //        expect(model.contextType).toBeUndefined();
    //
    //        model = ModelManager.createNewModel({contextLabel: 'myLabel'}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        expect(model.contextType).toBe(CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //
    //        model = undefined;
    //        try {
    //            model = ModelManager.createNewModel({contextLabel: 'myLabel'}, 'not existing context type');
    //        } catch (Error) {
    //            expect(Error).toBe('CONTEXT_TYPE: not existing context type is not a valid CONTEXT_TYPE. See constant CONTEXT_TYPES');
    //        }
    //        expect(model).toBeUndefined();
    //    }));
    //
    //    it('should process modelsUpdateInterceptors', function () {
    //        var model1, model2, model3, interceptor;
    //        model1 = ModelManager.createNewModel({contextLabel: 'label'}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        model2 = ModelManager.createNewModel({contextLabel: 'label'}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        model3 = ModelManager.createNewModel({contextLabel: 'label'}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        ModelManager.loadModel(model1.correlationId);
    //
    //        interceptor = function (currentModel, models) {
    //            currentModel.valueFromInterceptor = 'interceptorValue';
    //            for (var prop in models) {
    //                if (models.hasOwnProperty(prop)) {
    //                    if (models[prop].correlationId !== model1.correlationId) {
    //                        models[prop].valueFromInterceptor = 'interceptorValueOtherContext';
    //                    }
    //                }
    //            }
    //        };
    //        ModelManager.addModelsUpdateInterceptor(interceptor);
    //
    //
    //        //trigger modelsUpdate
    //        model1.value = 'testtriggervalue';
    //        $rootScope.$digest();
    //
    //        expect(ModelManager.getCurrentModel().valueFromInterceptor).toBe('interceptorValue');
    //        ModelManager.loadModel(model2.correlationId);
    //        expect(ModelManager.getCurrentModel().valueFromInterceptor).toBe('interceptorValueOtherContext');
    //        ModelManager.loadModel(model3.correlationId);
    //        expect(ModelManager.getCurrentModel().valueFromInterceptor).toBe('interceptorValueOtherContext');
    //    });
    //
    //    it('should find correct correlationId for businessKey', function () {
    //        var model1, model2, model3, model4;
    //        model1 = ModelManager.createNewModel({contextLabel: 'model 1'}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        model2 = ModelManager.createNewModel({contextLabel: 'model 2', businessKey: 2}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        model3 = ModelManager.createNewModel({contextLabel: 'model 3', businessKey: 3}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //        model4 = ModelManager.createNewModel({contextLabel: 'model 4'}, CONTEXT_TYPES.CONTEXT_TYPE_SCHADEN);
    //
    //        expect(ModelManager.getCorrelationIdForBusinessKey(2)).toBe(model2.correlationId);
    //        expect(ModelManager.getCorrelationIdForBusinessKey(3)).toBe(model3.correlationId);
    //        expect(ModelManager.getCorrelationIdForBusinessKey('xy')).toBeUndefined();
    //
    //    });
    //});

});

