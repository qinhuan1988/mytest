angular.module('webapp')
    .run([ 'TrackingService', run ]);


function run ( TrackingService ) {

    TrackingService.startTrack();

}
