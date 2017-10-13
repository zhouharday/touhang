<template>
    <section class="createForm" style="height: 100%">
        <div class="customForm">
            <div class="leftForm">
                <div class="box clearfix">
                    <div class="block">
                        <div class="name">表单</div>
                        <div class="circle blue"></div>
                    </div>
                    <form class="blue" id="dropArea">
                        <!--<div class="circle"></div>-->
                        <!--<div class="form-group">
        						    <label for="exampleInputEmail1">Email address</label>
        						    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
        						  </div>-->
                    </form>
                </div>
                <div class="operate">
                    <div class="block">
                        <div class="name">操作</div>
                        <div class="circle lightblue"></div>
                    </div>
                    <div class="button lightblue">
                        <div class="center">
                            <button type="button" class="btn btn-primary">预览</button>
                            <button type="button" class="btn btn-success">提交</button>
                        </div>
                    </div>
                </div>
            </div>
<<<<<<< HEAD
            <div class="rightForm">
                <form id="dragArea">
                    <div class="form-group">
                        <label>单行文本</label>
                        <input type="text" class="form-control" placeholder="单行文本">
=======
            <div class="span6">
                <h2>拖拽下面的控件到左侧</h2>
                <hr>
                <div class="tabbable">
                    <ul class="nav nav-tabs" id="navtab">
                        <li class="active">
                            <a href="#1" data-toggle="tab">常用控件</a>
                        </li>
                        <li class>
                            <a href="#2" data-toggle="tab">定制控件</a>
                        </li>
                        <li class>
                            <a id="sourcetab" href="#5" data-toggle="tab">源代码</a>
                        </li>
                    </ul>
                    <form class="form-horizontal" id="components">
                        <fieldset>
                            <div class="tab-content">
                                <div class="tab-pane active" id="1">
                                    <!-- Text start -->
                                    <div class="control-group component" rel="popover" title="文本框控件" trigger="manual" data-content="
                                                      <form class='form'>
                                                        <div class='controls'>
                                                          <label class='control-label'>控件名称</label>
                                                          <input type='text' id='orgname' placeholder='必填项'>
                                                          <label class='control-label'>默认值</label>
                                                           <input type='text' id='orgvalue' placeholder='默认值'>
                                                          <hr/>
                                                          <button class='btn btn-info' type='button'>确定</button><button class='btn btn-danger' type='button'>取消</button>
                                                        </div>
                                                      </form>">
                                        <!-- Text -->
                                        <label class="control-label leipiplugins-orgname">文本框</label>
                                        <div class="controls">
                                            <input name="leipiNewField" type="text" placeholder="默认值" title="文本框" value="" class="leipiplugins" leipiplugins="text" />
                                        </div>
                                    </div>
                                    <!-- Text end -->
                                </div>
                                <div class="tab-pane" id="2">
                                    <div class="control-group component" rel="popover" title="文件上传" trigger="manual" data-content="
                                                  <form class='form'>
                                                    <div class='controls'>
                                                      <label class='control-label'>控件名称</label> <input type='text' id='orgname' placeholder='必填项'>
                                                      <hr/>
                                                      <button class='btn btn-info' type='button'>确定</button><button class='btn btn-danger' type='button'>取消</button>
                                                    </div>
                                                  </form>">
                                        <label class="control-label leipiplugins-orgname">文件上传</label>
                                        <!-- File Upload -->
                                        <div>
                                            <input type="file" name="leipiNewField" title="文件上传" class="leipiplugins" leipiplugins="uploadfile">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
>>>>>>> ddad470f3622df18e1adb8dd05c7b9e3c73c6773
                    </div>

                    <div class="form-group">
                        <label>文本域</label>
                        <textarea class="form-control" rows="3" placeholder="文本域"></textarea>
                    </div>

                    <div class="form-group">
                        <label>文件上传</label>
                        <input type="file">
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="checkbox" checked>复选框
                        </label>
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="radio" checked>单选框
                        </label>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
//    import '../../../static/js/jquery-1.8.3.min'
//    import '../../../static/js/leipi.form.build.core'
//    import '../../../static/js/leipi.form.build.plugins'
//    import '../../../static/css/customForm_h5'
// let dom = 0;
export default {
    created() {
        // drag
        //     ({
        //         dragArea: "dragArea",
        //         dropArea: "dropArea"
        //     })
    },
    mounted() {
        drag
            ({
                dragArea: "dragArea",
                dropArea: "dropArea"
            })
    },
    // components: {jquery,core,plugins},
    data() {
        return {
            labelPosition: 'top',
            formLabelAlign: {
                name: '',
                must: ''
            },
            btnLists: [
                {
                    data: '多行文本框'
                },
                {
                    data: '时间'
                },
                {
                    data: '日期'
                },
                {
                    data: '上传'
                }
            ],
            pluginslists: [
                {
                    title: '标题',

                }
            ],
            type: [],
            input: '',
            textarea: ''
        }
    },
    methods: {
        drag() {
            alert(5855);
            //默认参数，传入的参数o之后会与之合并
            var options =
                {
                    dragArea: "dragArea",
                    dropArea: "dropArea",
                }
<<<<<<< HEAD
            //document.getElementById捕捉到的节点
            var targset =
                {
                    dragArea: null,
                    dropArea: null,
=======
            };
            /* 表单名称控件 form_name
            acc  是 class="component" 的DIV
            e 是 class="leipiplugins" 的控件
            */
            LPB.plugins['form_name'] = function(active_component, leipiplugins) {
                var plugins = 'form_name',
                    popover = $(".popover");
                //右弹form  初始化值
                $(popover).find("#orgvalue").val($(leipiplugins).val());
                //右弹form  取消控件
                $(popover).delegate(".btn-danger", "click", function(e) {
                    e.preventDefault();
                    active_component.popover("hide");
                });
                //右弹form  确定控件
                $(popover).delegate(".btn-info", "click", function(e) {
                    e.preventDefault(); //阻止元素发生默认的行为(例如,当点击提交按钮时阻止对表单的提交
                    var inputs = $(popover).find("input");
                    $.each(inputs, function(i, e) {
                        var attr_name = $(e).attr("id"); //属性名称
                        var attr_val = $("#" + attr_name).val();
                        if (attr_name == 'orgvalue') {
                            $(leipiplugins).attr("value", attr_val);
                            active_component.find(".leipiplugins-orgvalue").text(attr_val);
                        }
                        active_component.popover("hide");
                        LPB.genSource(); //重置源代码
                    });
                });

            }
            // })();

            // $(document).ready(function () {
            $("#navtab").delegate("#sourcetab", "click", function(e) {
                LPB.genSource();
            });
            $("form").delegate(".component", "mousedown", function(md) {
                $(".popover").remove();

                md.preventDefault();
                var tops = [];
                var mouseX = md.pageX;
                var mouseY = md.pageY;
                var $temp;
                var timeout;
                var $this = $(this);
                var delays = {
                    main: 0,
                    form: 120
>>>>>>> ddad470f3622df18e1adb8dd05c7b9e3c73c6773
                }
            //后面用于判断鼠标移动的时候是把元素底部的边变蓝还是上部的边变蓝
            var deraction =
                {
                    index: -1,
                    deraction: 0,
                    flag: -1,
                }

            //正在拖拽的元素
            var dragTargset;
            var empty = function(obj) {
                if (obj == undefined || obj == null || obj == "")
                    return true;

                return false;
            }

            var exception = function(tip) {
                console.log("dragErr:" + tip);
                throw new Error(tip);
            };

            var getTargset = function(id) {
                var targset = document.getElementById(id);
                if (empty(targset))
                    throw new Error("无法找到这个id")
                return targset;
            };

            //  ========== 
            //  = 获取鼠标所在的坐标位置 = 
            //  ========== 
            var getPageLocation = function(event) {
                var e = event || window.event;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                var x = e.pageX || e.clientX + scrollX;
                var y = e.pageY || e.clientY + scrollY;
                return { 'x': x, 'y': y };
            };

            var insertAfter = function(newElement, targsetElement) {
                var parent = targsetElement.parentNode;
                if (parent.lastChild == targsetElement) {
                    // 如果最后的节点是目标元素，则直接添加。因为默认是最后
                    parent.appendChild(newElement);
                }
                else {
                    //如果不是，则插入在目标元素的下一个兄弟节点的前面。也就是目标元素的后面
                    parent.insertBefore(newElement, targsetElement.nextSibling);
                }
            }

            var insertBefore = function(newElement, targsetElement) {
                targsetElement.parentNode.insertBefore(newElement, targsetElement)
            };
            //  ========== 
            //  = 将每个表单区的上下边界恢复成原样 = 
            //  ========== 
            var setBorderDefault = function() {
                if (targset.dropArea.children.length > 0)
                    for (var i = 0; i < targset.dropArea.children.length; i++) {
                        targset.dropArea.children[i].style.borderBottom = "";
                        targset.dropArea.children[i].style.borderTop = "";
                    }
            };
            //  ========== 
            //  = 获取CSS = 
            //  ========== 
            var getCss = function(o, key) {
                return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
            };
            var preventDefault = function(e) {
                e.preventDefault();
            };
            ///  ========== 
            //  = 将表单元素拖拽到右边删掉 = 
            //  ========== 
            var dragOut = function(e) {
                e.preventDefault();
                if (deraction.flag == 2) {
                    dragTargset.parentNode.removeChild(dragTargset);
                    setBorderDefault();
                }
            };
            //  ========== 
            //  = 开始拖动 = 
            //  ========== 
            var dragStart = function(e) {
                dragTargset = e.targset;
                //区分拖拽的元素是要新增呢还是要交换位置，记录到flag上，1表示要新增，2表示交换位置
                if (dragTargset.parentNode.id == options.dragArea) {
                    deraction.flag = 1;
                }
                else {
                    deraction.flag = 2;
                    targset.dragArea.addEventListener("dragover", preventDefault);
                }
            };
            //  ========== 
            //  = 拖动经过 = 
            //  ========== 
            var dragOver = function(e) {
                e.preventDefault();
                var pageLocation = getPageLocation();
                var index = -1;
                //检测目前鼠标正落在哪个表单元素上面
                if (targset.dropArea.children.length > 0) {
                    for (var i = 0; i < targset.dropArea.children.length; i++) {
                        var pos = targset.dropArea.children[i].getBoundingClientRect();
                        if (pageLocation.y >= pos.bottom)
                            continue;
                        index = i;
                        break;
                    }
                }
                else {
                    index = 0;
                    deraction["deraction"] = 0;
                    deraction["index"] = -1;
                    deraction["flag"] = 1;
                    return;
                }


                if (index != -1) {
                    var pos = targset.dropArea.children[index].getBoundingClientRect();
                    setBorderDefault();
                    //鼠标落在表单元素宽度中间以上的部分，则上边变蓝
                    if ((pos.bottom + pos.top) / 2 > pageLocation.y)//元素的上边变蓝
                    {
                        deraction["deraction"] = -1;
                        deraction["index"] = index;
                        targset.dropArea.children[index].style.borderTop = "1px solid blue";
                    }
                    else//元素的下边变蓝
                    {
                        deraction["deraction"] = 1;
                        deraction["index"] = index;
                        targset.dropArea.children[index].style.borderBottom = "1px solid blue";
                    }

                }
                else//当前拖拽的是第一个表单元素
                {
                    deraction["deraction"] = 0;
                    deraction["index"] = -1;
                }
            };
            //  ========== 
            //  = 拖动结束 = 
            //  ========== 
            var dragEnd = function(e) {
                setBorderDefault();
                targset.dragArea.removeEventListener("dragover", preventDefault);
            }

            //  ========== 
            //  = 放置 = 
            //  ========== 
            var drop = function(e) {
                e.preventDefault();
                if (deraction.index != -1) {
                    var index = deraction.index;
                    if (deraction.deraction > 0) {
                        var node;
                        //flag为1，插入表单元素，否则就是换位置
                        if (deraction.flag == 1) {
                            node = dragTargset.cloneNode(true);
                            node.addEventListener("dragstart", dragStart);
                            node.addEventListener("dragend", dragEnd);
                        }
                        else {
                            node = dragTargset
                        }
                        insertAfter(node, targset.dropArea.children[index]);
                    }
                    else if (deraction.deraction < 0) {
                        var node;
                        if (deraction.flag == 1) {
                            node = dragTargset.cloneNode(true);
                            node.addEventListener("dragstart", dragStart);
                            node.addEventListener("dragend", dragEnd);
                        }
                        else {
                            node = dragTargset
                        }
                        insertBefore(node, targset.dropArea.children[index]);
                    }
                    //targset.dropArea=document.getElementById("dropArea");
                }
                else if (deraction.flag == 1)//第一个插入的表单元素
                {
                    var node = dragTargset.cloneNode(true);
                    node.addEventListener("dragstart", dragStart);
                    node.addEventListener("dragend", dragEnd);
                    targset.dropArea.appendChild(node)
                }
                deraction.index = -1;
                //  setBorderDefault();
            };
            //  ========== 
            //  = 初始化 = 
            //  ========== 
            var init = function() {
                extend(args)
                if (!empty(options.dragArea)) {
                    targset.dragArea = getTargset(options.dragArea);
                    targset.dragArea.addEventListener("drop", dragOut);
                    if (targset.dragArea.children.length > 0)
                        for (var i = 0; i < targset.dragArea.children.length; i++) {
                            targset.dragArea.children[i].setAttribute("draggable", "true");
                            targset.dragArea.children[i].addEventListener("dragstart", dragStart);
                            targset.dragArea.children[i].addEventListener("dragend", dragEnd);
                        }
                }
                else {
                    exception("请设置拖拽区域");
                }

<<<<<<< HEAD
                if (!empty(options.dropArea)) {
                    targset.dropArea = getTargset(options.dropArea);
                    targset.dropArea.addEventListener("drop", drop);
                    targset.dropArea.addEventListener("dragover", dragOver);
                }
                else {
                    exception("请设置存取地址");
                }

            };
            //  ========== 
            //  = 合并参数 = 
            //  ========== 
            var extend = function(n) {
                for (var p in n) if (!options.hasOwnProperty(p) || (options.hasOwnProperty(p) && options[p] != n[p]))
                    options[p] = n[p];
            };
            //执行
            // if (args.length > 1) 
            //     args = args[0];
            //     init.apply(this, args);
=======
            /* 文本框控件 text
            acc  是 class="component" 的DIV
            e 是 class="leipiplugins" 的控件
            */
            LPB.plugins['text'] = function(active_component, leipiplugins) {
                var plugins = 'text', popover = $(".popover");
                //右弹form  初始化值
                $(popover).find("#orgname").val($(leipiplugins).attr("title"));
                $(popover).find("#orgvalue").val($(leipiplugins).val());
                //右弹form  取消控件
                $(popover).delegate(".btn-danger", "click", function(e) {
>>>>>>> ddad470f3622df18e1adb8dd05c7b9e3c73c6773


        },
        // drag: function(event) {
        //     dom = event.currentTargset
        // },
        // drop: function(event) {
        //     event.preventDefault();
        //     event.targset.appendChild(dom)
        // },
        // allowDrop: function(e) {
        //     event.preventDefault();
        // }
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";
@import "../../../static/css/customForm_h5.css";

.createForm {
    width: 100%;
    min-height: 100%;
    font-size: 14px;
    .button {
        background-color: #fff;
        margsin-bottom: 20px;
        padding: 5px;
        /*padding-bottom: 5px;*/
        text-align: right;
    }
    .form-components {
        text-align: center;
        padding-top: 10px;
    }
    ul {
        margsin-top: 30px;
        text-align: center;
    }
    ul>li {
        margsin-bottom: 10px;
    }
}
</style>
