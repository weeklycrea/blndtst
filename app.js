angular.module('app', [])
 
.controller('BlindTest', function($http) {
    var vm = this;
    vm.index = 0;
    vm.maxIndex = 0;
    vm.songs = [];

    $http.get("songs.json").then(function (data) {
        vm.songs = data.data;
        for (let i = 0; i < vm.songs.length; i++) {
            vm.songs[i].userInput = {
                artist:'',
                song:''
            }
        }
    }, function (error) {
        console.log("Error loading song file: ", error);
    });
    vm.next = function() {
        vm.index = Math.min(vm.index + 1, vm.songs.length + 1);
        if (vm.index > vm.maxIndex) {
            vm.maxIndex = vm.index;
        }
        if (vm.songs[vm.index].userInput.artist.length === 0) {
            document.getElementById('input-artist').focus();
        } else if (vm.songs[vm.index].userInput.song.length === 0) {
            document.getElementById('input-song').focus();
        }
    }
    vm.previous = function() {
        vm.index = Math.max(vm.index - 1, 0);
    }

    vm.setIndex = function($index) {
        if(vm.maxIndex >= $index) {
            vm.index = $index
        }
    }
    vm.getReponses = function() {
        let r = '';
        for (let i = 0; i < vm.songs.length; i++) {
            r += 'Son n°' + (i+1) + ': ' + vm.songs[i].userInput.song + ' (' + vm.songs[i].userInput.artist+ ')\r\n';
        }
        return r;
    }
    vm.clipboard = function() {
        const copyText = document.getElementById("result").textContent;
        const textArea = document.createElement('textarea');
        textArea.textContent = copyText;
        document.body.append(textArea);
        textArea.select();
        document.execCommand("copy");
    }
 });