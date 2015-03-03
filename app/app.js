(
    function () {
        'use strict';

        var app = angular.module('app', []);
        app.controller('ctrl', [function () {
            var vm = this;
            vm.rawData = [];
            vm.getStyle = function (h) {
                /*var style = '\'padding-left\': ' + (h.depth * 10) + 'px';*/
                var style = {
                    'padding-left': (h.depth * 15) + 'px',
                    'color': h.name.indexOf('2') !== -1 ? 'red' : 'green'
                };
                return style;
            };

            var rawData = vm.rawData;
            createData();
            draw();

            function createData() {
                for (var i = 0; i < 5; i++) {
                    rawData.push({
                        name: 'node' + i,
                        id: i
                    });
                }
                for (var j = 0; j < 3; j++) {
                    rawData.push({
                        name: 'node2-' + j,
                        id: parseFloat('2' + j),
                        parentId: 2
                    });
                }
                for (var j = 0; j < 3; j++) {
                    rawData.push({
                        name: 'node2-1-' + j,
                        id: parseFloat('21' + j),
                        parentId: 21
                    });
                }
            }

            function draw() {
                var tree = {
                    name: 'root',
                    children: []
                };
                vm.rawData.forEach(function (d, i) {
                    if (!d.parentId) {
                        tree.children.push(d);
                    }
                });
                tree.children.forEach(function (d) {
                    d.children = getChildren(vm.rawData, d.id);
                });
                console.log('tree:');
                console.log(tree);
                var hierarchy = d3.layout.hierarchy()(tree);
                vm.hierarchy = hierarchy;
                /*var enterSelection = d3.select('svg').selectAll('.node')
                    .data(hierarchy)
                    .enter();
                var g = enterSelection.append('g').attr({
                    'transform': function (d, i) {
                        return 'translate(' + (d.depth * 10) + ',' + (i * 20) + ')';
                    }
                });
                g.append('text').text(function (d, i) {
                    return d.name;
                });
                g.append('rect').attr({
                    'width':50,
                    'height':10
                }).style({
                    'fill':'red'
                });*/
            }

            function getChildren(list, id) {
                console.log(id);
                console.log(list);
                var children = _.filter(list, function (d) {
                    return d.parentId === id;
                });
                if (children.length > 0) {
                    console.log('children:');
                    console.log(children);
                    children.forEach(function (c) {
                        console.log('children loop:');
                        console.log(list);
                        c.children = getChildren(list, c.id);
                    });
                }
                return children;
            }
        }]);
    }()
);