// Jobs service used to communicate Jobs REST endpoints
'use strict';

(function () {
  
  angular
    .module('jobs')
    .factory('JobsService', JobsService);

  JobsService.$inject = ['$resource'];

  function JobsService($resource) {
    return $resource('api/jobs/:jobId', {
      jobId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  angular.extend(Job.prototype, {
      createOrUpdate: function () {
        var job = new Jobs({
          title: this.title,
          company: this.company,
          description: this.description,
          hourly_wage: this.hourly_wage,
          requirements: this.requirements,
          state: this.state,
          contact_email: this.contact_email
        });
      
        return createOrUpdate(job);
      }
    });

    return Job;

    function createOrUpdate(job) {
      if (job._id) {
        return job.$update(onSuccess, onError);
      } else {
        return job.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(job) {
      // Any required internal processing from inside the service, goes here.
        //Clear the form fields
        $scope.title = '';
        $scope.company = '';
        $scope.description = '';
        $scope.requirements = '';
        $scope.hourly_wage = '';
        $scope.state = '';
        $scope.contact_email = '';

      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
