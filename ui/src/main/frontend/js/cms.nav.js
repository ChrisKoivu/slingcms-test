/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-env browser, es6 */
(function (rava) {
    'use strict';
    
    var urlParams = new URLSearchParams(window.location.search),
        resourceParam = urlParams.get('resource'),
        searchParam = urlParams.get('search');
    
    rava.bind(".navbar-burger", {
        events: {
            click: function () {
                var target = document.querySelector(this.dataset.target);
                target.classList.toggle('is-active');
                this.classList.toggle('is-active');
            }
        }
    });
    
    rava.bind('.layout-switch select', {
        events: {
            change: function () {
                window.location = this.value;
            }
        }
    });
    
    rava.bind('.contentnav', {
        callbacks : {
            created: function () {
                let cnav = this;
                var search = document.querySelector('.contentnav-search input[name=search]'),
                    filter = function (event) {
                        event.stopPropagation();
                        event.preventDefault();
                        var value = search.value.toLowerCase();
                        cnav.querySelectorAll('.contentnav__item').forEach(function (item) {
                            if (item.innerText.toLowerCase().indexOf(value) === -1 && !item.querySelector('*[data-value="' + resourceParam + '"]')) {
                                item.classList.add('is-hidden');
                            } else {
                                item.classList.remove('is-hidden');
                            }
                        });
                    };
                if(search){
                    search.addEventListener('keyup', filter);
                    search.addEventListener('change', filter);
                }
                if (resourceParam) {
                    cnav.querySelectorAll('.contentnav__item').forEach(function (item) {
                        if (item.querySelector('*[data-value="' + resourceParam + '"]')) {
                            item.classList.remove('is-hidden');
                            item.click();
                        } else {
                            item.classList.add('is-hidden');
                        }
                    });
                    document.querySelector('.contentnav-search input[name=search]').value = resourceParam;
                } else if (searchParam) {
                    document.querySelector('.contentnav-search input[name=search]').value = searchParam;
                    filter(new Event('fake'));
                }
            }
        }
    });
    rava.bind(".contentnav .contentnav__item", {
        events: {
            click: function () {
                this.closest('.contentnav').querySelectorAll('.contentnav__item.is-selected').forEach(function (tr) {
                    tr.classList.remove('is-selected');
                });
                this.classList.add('is-selected');
                document.querySelector('.actions-target').innerHTML = this.querySelector('.cell-actions').innerHTML;
            },
            dblclick: function () {
                if(this.querySelector('.item-link')){
                    window.location = this.querySelector('.item-link').href;
                }
            }
        }
    });
}(window.rava = window.rava || {}));