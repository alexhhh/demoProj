var App;
(function (App) {
    var Services;
    (function (Services) {
        var GetSpecialityRequest = (function () {
            function GetSpecialityRequest() {
            }
            return GetSpecialityRequest;
        }());
        Services.GetSpecialityRequest = GetSpecialityRequest;
        var AddSpecialityRequest = (function () {
            function AddSpecialityRequest() {
            }
            return AddSpecialityRequest;
        }());
        Services.AddSpecialityRequest = AddSpecialityRequest;
        var DeleteSpecialityRequest = (function () {
            function DeleteSpecialityRequest() {
            }
            return DeleteSpecialityRequest;
        }());
        Services.DeleteSpecialityRequest = DeleteSpecialityRequest;
        var GetMesterRequest = (function () {
            function GetMesterRequest() {
            }
            return GetMesterRequest;
        }());
        Services.GetMesterRequest = GetMesterRequest;
        var AddEditMesterRequest = (function () {
            function AddEditMesterRequest() {
                this.speciality = new Array();
                this.isEdit = false;
            }
            return AddEditMesterRequest;
        }());
        Services.AddEditMesterRequest = AddEditMesterRequest;
        var SearchMesterRequest = (function () {
            function SearchMesterRequest() {
            }
            return SearchMesterRequest;
        }());
        Services.SearchMesterRequest = SearchMesterRequest;
        var SearchReviewMesterRequest = (function () {
            function SearchReviewMesterRequest() {
            }
            return SearchReviewMesterRequest;
        }());
        Services.SearchReviewMesterRequest = SearchReviewMesterRequest;
        var GetMesterAvgRatingRequest = (function () {
            function GetMesterAvgRatingRequest() {
            }
            return GetMesterAvgRatingRequest;
        }());
        Services.GetMesterAvgRatingRequest = GetMesterAvgRatingRequest;
        var DeleteMesterRequest = (function () {
            function DeleteMesterRequest() {
            }
            return DeleteMesterRequest;
        }());
        Services.DeleteMesterRequest = DeleteMesterRequest;
        var AddMesterReviewRequest = (function () {
            function AddMesterReviewRequest() {
            }
            return AddMesterReviewRequest;
        }());
        Services.AddMesterReviewRequest = AddMesterReviewRequest;
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=Requests.js.map