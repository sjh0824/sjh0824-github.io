;(function (angular) {
  /**
  * MusicApp Module
  */
  angular
    .module('musicApp', ['ngAnimate', 'ngRoute'])
    .constant('options', {
      server_root: 'http://192.168.10.180:2080/'
    })
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!')
      // $locationProvider.html5Mode(true)
      $routeProvider
        .when('/home', {
          controller: 'HomeController',
          templateUrl: 'home',
          controllerAs: 'vm'
        })
        .when('/list', {
          controller: 'ListController',
          templateUrl: 'list',
          controllerAs: 'vm'
        })
        .when('/item/:id', {
          controller: 'PlayerController',
          templateUrl: 'player',
          controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/home' })
    }])
    .controller('AppController', ['$location', 'options', function ($location, options) {
      const vm = this
      vm.data = {}
      vm.data.server_root = options.server_root

      vm.actions = {}
      vm.actions.go = (to) => $location.url(to)
    }])
    .controller('HomeController', ['$scope', function ($scope) {
      const vm = this
      vm.data = {}
      vm.actions = {}
    }])
    .controller('ListController', ['$scope', '$http', 'options', function ($scope, $http, options) {
      const vm = this
      vm.data = {}
      vm.data.songs = []
      $http
        .jsonp(options.server_root + 'list?callback=JSON_CALLBACK')
        .then(res => {
          window.songs = vm.data.songs = res.data
        })

      vm.actions = {}
    }])
    .controller('PlayerController', ['$scope', '$routeParams', 'options', function ($scope, $routeParams, options) {
      const vm = this
      vm.data = window.songs[$routeParams.id];

      // 播放音乐
      window.audio && window.audio.pause()
      const audio = window.audio = new Audio()
      audio.autoplay = true
      audio.loop = true
      audio.src = `${options.server_root}musics/${vm.data.file}`
      audio.load()
      audio.addEventListener('durationchange', () => {
        vm.data.duration = audio.duration
        $scope.$apply()
      })
      audio.addEventListener('play', () => {
        vm.data.playing = true
        // $scope.$apply()
      })
      audio.addEventListener('pause', () => {
        vm.data.playing = false
        $scope.$apply()
      })
      audio.addEventListener('timeupdate', () => {
        // vm.data.progress = audio.currentTime / audio.duration * 100
        vm.data.current = audio.currentTime
        vm.data.remain = convert(audio.duration - audio.currentTime)
        $scope.$apply()
      })
      audio.addEventListener('ended', () => {
        // vm.data.progress = audio.currentTime / audio.duration * 100
        vm.data.playing = false
        $scope.$apply()
      })

      vm.actions = {}

      vm.actions.play = () => {
        vm.data.playing ? audio.pause() : audio.play();
        // vm.data.playing = !vm.data.playing
      }

      vm.actions.progress = (e) => {
        audio.currentTime = vm.data.current
      }
    }])

    const convert = (second) => {
      function pad(num, n) {
        return (Array(n).join(0) + num).slice(-n)
      }
      var h = Math.floor(second / 3600)
      var m = Math.floor(second % 3600 / 60)
      var s = Math.floor(second % 60)
      return h ? `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}` : `${pad(m, 2)}:${pad(s, 2)}`
    }
}(angular))
