<template>
    <section class="createForm" style="height: 100%">
        <div class="bs-header" id="content">
            <div class="container">
                <h1><img src="Public/js/formbuild/images/leipi_formbuild.png" width="64" />拖拽式表单设计器
                    <small>Formbuild Leipi Org</small>
                </h1>
                <p>
                    <strong>拖拽式</strong> VS
                    <strong>编辑器</strong><br/>VS：设计的表单是兼容的，但它们的样式不同，拖拽式是傻瓜式排版而编辑器排版难度大一些但效果更好。
                    <br/> 交流Q群：143263697
                </p>
            </div>
        </div>
        <div class="container">
            <div class="row clearfix">
                <div class="span6">
                    <div class="clearfix">
                        <h2>我的表单</h2>
                        <hr>
                        <div id="build">
                            <form id="target" class="form-horizontal">
                                <fieldset>
                                    <div id="legend" class="component" rel="popover" title="编辑属性" trigger="manual" data-content="
                                                <form class='form'>
                                                  <div class='controls'>
                                                    <label class='control-label'>表单名称</label> <input type='text' id='orgvalue' placeholder='请输入表单名称'>
                                                    <hr/>
                                                    <button class='btn btn-info' type='button'>确定</button><button class='btn btn-danger' type='button'>取消</button>
                                                  </div>
                                                </form>">
                                        <input type="hidden" name="form_name" value="" class="leipiplugins" leipiplugins="form_name" />
                                        <legend class="leipiplugins-orgvalue">点击填写表单名</legend>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
                    </div>
                </div>
                <!--tab-content-->
            </div>
            </el-col>
            <el-col :span="14" style="background-color: #fff;height: 100%;margin: 0 10px;">
                <div class="form-components" @drop='drop($event)' @dragover='allowDrop($event)' style="height:100%">
                    <span>中间内容</span>
                </div>
            </el-col>
            <el-col :span="5" style="background-color: #fff;height: 100%;margin-right: -10px;">
                <div class="form-components">
                    <span style="text-align: center;margin-top: 30px;">组件设置</span>
                    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" styele="margin-top:30px;">
                        <el-form-item label="标题">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                        <el-form-item label="必填项目">
                            <el-checkbox v-model="formLabelAlign.must" label="这个是必填项" name="must">
                            </el-checkbox>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            </el-row>
    </section>
</template>

<script>
//    import jquery from '../../../static/js/jquery-1.8.3.min'
//    import core from 'common/js/leipi.form.build.core'
//    import plugins from 'common/js/leipi.form.build.plugins'
let dom = 0;
export default {
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
        coreForm() {
            // (function () {
            var LPB = window.LPB = window.LPB || {
                plugins: [],
                genSource: function() {
                    var $temptxt = $("<div>").html($("#build").html());
                    //scrubbbbbbb
                    $($temptxt).find(".component").attr({
                        "title": null,
                        "data-original-title": null,
                        "data-type": null,
                        "data-content": null,
                        "rel": null,
                        "trigger": null,
                        "style": null
                    });
                    $($temptxt).find(".valtype").attr("data-valtype", null).removeClass("valtype");
                    $($temptxt).find(".component").removeClass("component");
                    $($temptxt).find("form").attr({
                        "id": null,
                        "style": null
                    });
                    $("#source").val($temptxt.html().replace(/\n\ \ \ \ \ \ \ \ \ \ \ \ /g, "\n"));
                }
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
                }
                var type;

                if ($this.parent().parent().parent().parent().attr("id") === "components") {
                    type = "main";
                } else {
                    type = "form";
                }

                var delayed = setTimeout(function() {
                    if (type === "main") {
                        $temp = $("<form class='form-horizontal span6' id='temp'></form>").append($this.clone());
                    } else {
                        if ($this.attr("id") !== "legend") {
                            $temp = $("<form class='form-horizontal span6' id='temp'></form>").append($this);
                        }
                    }

                    $("body").append($temp);

                    $temp.css({
                        "position": "absolute",
                        "top": mouseY - ($temp.height() / 2) + "px",
                        "left": mouseX - ($temp.width() / 2) + "px",
                        "opacity": "0.9"
                    }).show()

                    var half_box_height = ($temp.height() / 2);
                    var half_box_width = ($temp.width() / 2);
                    var $target = $("#target");
                    var tar_pos = $target.position();
                    var $target_component = $("#target .component");

                    $(document).delegate("body", "mousemove", function(mm) {

                        var mm_mouseX = mm.pageX;
                        var mm_mouseY = mm.pageY;

                        $temp.css({
                            "top": mm_mouseY - half_box_height + "px",
                            "left": mm_mouseX - half_box_width + "px"
                        });

                        if (mm_mouseX > tar_pos.left &&
                            mm_mouseX < tar_pos.left + $target.width() + $temp.width() / 2 &&
                            mm_mouseY > tar_pos.top &&
                            mm_mouseY < tar_pos.top + $target.height() + $temp.height() / 2
                        ) {
                            $("#target").css("background-color", "#fafdff");
                            $target_component.css({
                                "border-top": "1px solid white",
                                "border-bottom": "none"
                            });
                            tops = $.grep($target_component, function(e) {
                                return ($(e).position().top - mm_mouseY + half_box_height > 0 && $(e).attr("id") !== "legend");
                            });
                            if (tops.length > 0) {
                                $(tops[0]).css("border-top", "1px solid #22aaff");
                            } else {
                                if ($target_component.length > 0) {
                                    $($target_component[$target_component.length - 1]).css("border-bottom", "1px solid #22aaff");
                                }
                            }
                        } else {
                            $("#target").css("background-color", "#fff");
                            $target_component.css({
                                "border-top": "1px solid white",
                                "border-bottom": "none"
                            });
                            $target.css("background-color", "#fff");
                        }
                    });

                    $("body").delegate("#temp", "mouseup", function(mu) {
                        mu.preventDefault();

                        var mu_mouseX = mu.pageX;
                        var mu_mouseY = mu.pageY;
                        var tar_pos = $target.position();

                        $("#target .component").css({
                            "border-top": "1px solid white",
                            "border-bottom": "none"
                        });
                        // acting only if mouse is in right place
                        if (mu_mouseX + half_box_width > tar_pos.left &&
                            mu_mouseX - half_box_width < tar_pos.left + $target.width() &&
                            mu_mouseY + half_box_height > tar_pos.top &&
                            mu_mouseY - half_box_height < tar_pos.top + $target.height()
                        ) {
                            $temp.attr("style", null);
                            // where to add
                            if (tops.length > 0) {
                                $($temp.html()).insertBefore(tops[0]);
                            } else {
                                $("#target fieldset").append($temp.append("\n\n\ \ \ \ ").html());
                            }
                        } else {
                            // no add
                            $("#target .component").css({
                                "border-top": "1px solid white",
                                "border-bottom": "none"
                            });
                            tops = [];
                        }
                        //clean up & add popover
                        $target.css("background-color", "#fff");
                        $(document).undelegate("body", "mousemove");
                        $("body").undelegate("#temp", "mouseup");
                        $("#target .component").popover({
                            trigger: "manual"
                        });
                        $temp.remove();
                        LPB.genSource();
                    });
                }, delays[type]);

                $(document).mouseup(function() {
                    clearInterval(delayed);
                    return false;
                });
                $(this).mouseout(function() {
                    clearInterval(delayed);
                    return false;
                });
            });

            // activate legend popover
            $("#target .component").popover({
                trigger: "manual"
            });
            //popover on click event
            $("#target").delegate(".component", "click", function(e) {
                e.preventDefault();
                //$(".popover").hide();
                var active_component = $(this);
                active_component.popover("show");
                //class="leipiplugins"
                var leipiplugins = active_component.find(".leipiplugins"),
                    plugins = $(leipiplugins).attr("leipiplugins"); //leipiplugins="text"
                //exec plugins
                if (typeof (LPB.plugins[plugins]) == 'function') {
                    try {
                        LPB.plugins[plugins](active_component, leipiplugins);
                    } catch (e) {
                        alert('控件异常，请到 [雷劈网] 反馈或寻求帮助！');
                    }
                } else {
                    alert("控件有误或不存在，请与我们联系！");
                }
            });
            // });
        },
        plugins() {
            /*e.preventDefault();//阻止元素发生默认的行为(例如,当点击提交按钮时阻止对表单的提交*/

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

                    active_component.popover("hide");
                });
                //右弹form  确定控件
                $(popover).delegate(".btn-info", "click", function(e) {
                    alert(444);
                    var inputs = $(popover).find("input");
                    console.log($(popover).find("#orgvalue").val());
                    if ($(popover).find("textarea").length > 0) {
                        inputs.push($(popover).find("textarea")[0]);
                    }
                    $.each(inputs, function(i, e) {
                        var attr_name = $(e).attr("id");//属性名称
                        var attr_val = $(e).val();
                        switch (attr_name) {
                            //要break
                            case 'orgvalue':
                                //$(leipiplugins).val(attr_val);
                                $(leipiplugins).attr("value", attr_val);
                                break;
                            //没有break
                            case 'orgname':
                                $(leipiplugins).attr("title", attr_val);
                                active_component.find(".leipiplugins-orgname").text(attr_val);
                                break;
                            default:
                                $(leipiplugins).attr(attr_name, attr_val);
                        }
                        active_component.popover("hide");
                        LPB.genSource();//重置源代码
                    });

                });
            }
        },
        drag: function(event) {
            dom = event.currentTarget
        },
        drop: function(event) {
            event.preventDefault();
            event.target.appendChild(dom)
        },
        allowDrop: function(e) {
            event.preventDefault();
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../common/styles/variable.less";

.createForm {
    width: 100%;
    min-height: 100%;
    font-size: 14px;
    .button {
        background-color: #fff;
        margin-bottom: 20px;
        padding: 5px;
        /*padding-bottom: 5px;*/
        text-align: right;
    }
    .form-components {
        text-align: center;
        padding-top: 10px;
    }
    ul {
        margin-top: 30px;
        text-align: center;
    }
    ul>li {
        margin-bottom: 10px;
    }
}
</style>