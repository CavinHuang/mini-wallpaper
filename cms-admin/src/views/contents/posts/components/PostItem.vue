<template>
  <div class="article-item">
    <a class="cover-image" href="javascript:void();" target="_blank" rel="noopener noreferrer" v-if="post.thumbnail.length">
      <el-image :src="post.thumbnail[0]" alt="" />
      <div class="icon news"></div
    ></a>
    <div class="article-info">
      <div class="article-title">
        <div class="title">
          <a href="javascript:void(0);" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
        </div>
        <div class="time">{{ post.createAt }}</div>
      </div>
      <div class="article-tags">
        <span class="line-wrap">
          <div class="article-tags create-tag" style="color: rgb(61, 150, 129); background-color: rgba(61, 150, 129, 0.05)">
            已发布
          </div>
          <span>标签：</span>
          <div
            class="article-tags create-tag"
            v-for="tag in post.tags"
            :key="tag.id"
            style="color: rgb(78, 91, 118); background-color: rgba(78, 91, 118, 0.05)"
          >
            {{ tag.tag_name }}
          </div>
          <span>分类：</span>
          <div
            class="article-tags create-hover-tag"
            v-for="cate in post.categories"
            :key="cate.id"
            style="color: rgb(78, 91, 118); background-color: rgba(78, 91, 118, 0.05)"
          >
            {{ cate.name }}
          </div>
        </span>
      </div>
      <div class="article-hint"></div>
      <div class="data2action">
        <div class="data2action_commonData fl">
          <span class="wrap fl"
            ><div class="count-item">
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5o6o6I2QPC90aXRsZT4KICAgIDxnIGlkPSLlsJ3or5UiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnvJbnu4QtMuWkh+S7vS0xMjMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTAuMDAwMDAwLCAtMTE0LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwLjAwMDAwMCwgMjQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTU05aSH5Lu9LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MC4wMDAwMDAsIDkwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIGZpbGw9IiNEOEQ4RDgiIG9wYWNpdHk9IjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00LjQ5OTE5NjQsMiBMMTEuNTAwODAzNiwyIEMxMi4zNjk4Mjg2LDIgMTIuNjg0OTU4MSwyLjA5MDQ4MzU1IDEzLjAwMjY2MDcsMi4yNjAzOTI3NCBDMTMuMzIwMzYzMiwyLjQzMDMwMTkzIDEzLjU2OTY5ODEsMi42Nzk2MzY3NiAxMy43Mzk2MDczLDIuOTk3MzM5MzMgQzEzLjkwOTUxNjUsMy4zMTUwNDE4OSAxNCwzLjYzMDE3MTM3IDE0LDQuNDk5MTk2NCBMMTQsMTEuNTAwODAzNiBDMTQsMTIuMzY5ODI4NiAxMy45MDk1MTY1LDEyLjY4NDk1ODEgMTMuNzM5NjA3MywxMy4wMDI2NjA3IEMxMy41Njk2OTgxLDEzLjMyMDM2MzIgMTMuMzIwMzYzMiwxMy41Njk2OTgxIDEzLjAwMjY2MDcsMTMuNzM5NjA3MyBDMTIuNjg0OTU4MSwxMy45MDk1MTY1IDEyLjM2OTgyODYsMTQgMTEuNTAwODAzNiwxNCBMNC40OTkxOTY0LDE0IEMzLjYzMDE3MTM3LDE0IDMuMzE1MDQxODksMTMuOTA5NTE2NSAyLjk5NzMzOTMzLDEzLjczOTYwNzMgQzIuNjc5NjM2NzYsMTMuNTY5Njk4MSAyLjQzMDMwMTkzLDEzLjMyMDM2MzIgMi4yNjAzOTI3NCwxMy4wMDI2NjA3IEMyLjA5MDQ4MzU1LDEyLjY4NDk1ODEgMiwxMi4zNjk4Mjg2IDIsMTEuNTAwODAzNiBMMiw0LjQ5OTE5NjQgQzIsMy42MzAxNzEzNyAyLjA5MDQ4MzU1LDMuMzE1MDQxODkgMi4yNjAzOTI3NCwyLjk5NzMzOTMzIEMyLjQzMDMwMTkzLDIuNjc5NjM2NzYgMi42Nzk2MzY3NiwyLjQzMDMwMTkzIDIuOTk3MzM5MzMsMi4yNjAzOTI3NCBDMy4zMTUwNDE4OSwyLjA5MDQ4MzU1IDMuNjMwMTcxMzcsMiA0LjQ5OTE5NjQsMiBaIiBpZD0i6K+E6K66IiBzdHJva2U9IiM2NjY2NjYiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEwLjAyNjc4NTcsNS44NjE0NzE4NiBMMTAuMDI2Nzg1Nyw1LjI5ODcwMTMgTDExLjk5MTA3MTQsNS4yOTg3MDEzIEwxMS45OTEwNzE0LDQuNTQ1NDU0NTUgTDEwLjAyNjc4NTcsNC41NDU0NTQ1NSBMMTAuMDI2Nzg1Nyw0IEw5LjE2OTY0Mjg2LDQgTDkuMTY5NjQyODYsNC41NDU0NTQ1NSBMNy4wMDg5Mjg1Nyw0LjU0NTQ1NDU1IEw3LjAwODkyODU3LDQgTDYuMTUxNzg1NzEsNCBMNi4xNTE3ODU3MSw0LjU0NTQ1NDU1IEw0LjE4NzUsNC41NDU0NTQ1NSBMNC4xODc1LDUuMjk4NzAxMyBMNi4xNTE3ODU3MSw1LjI5ODcwMTMgTDYuMTUxNzg1NzEsNS44NTI4MTM4NSBMNy4wMDg5Mjg1Nyw1Ljg1MjgxMzg1IEw3LjAwODkyODU3LDUuMjk4NzAxMyBMOS4xNjk2NDI4Niw1LjI5ODcwMTMgTDkuMTY5NjQyODYsNS44NjE0NzE4NiBMMTAuMDI2Nzg1Nyw1Ljg2MTQ3MTg2IFogTTYuNDAxNzg1NzEsMTIgTDYuNDAxNzg1NzEsOC4zNjM2MzYzNiBDNi43NTg5Mjg1Nyw3Ljk2NTM2Nzk3IDcuMDcxNDI4NTcsNy41NDk3ODM1NSA3LjMzOTI4NTcxLDcuMTA4MjI1MTEgTDExLjk0NjQyODYsNy4xMDgyMjUxMSBMMTEuOTQ2NDI4Niw2LjM1NDk3ODM1IEw3LjcyMzIxNDI5LDYuMzU0OTc4MzUgQzcuNzg1NzE0MjksNi4yMDc3OTIyMSA3Ljg0ODIxNDI5LDYuMDYwNjA2MDYgNy45MDE3ODU3MSw1LjkwNDc2MTkgTDcuMDgwMzU3MTQsNS43NjYyMzM3NyBDNyw1Ljk1NjcwOTk2IDYuOTEwNzE0MjksNi4xNTU4NDQxNiA2LjgxMjUsNi4zNTQ5NzgzNSBMNC4zMzAzNTcxNCw2LjM1NDk3ODM1IEw0LjMzMDM1NzE0LDcuMTA4MjI1MTEgTDYuMzQ4MjE0MjksNy4xMDgyMjUxMSBDNS43NzY3ODU3MSw3LjkwNDc2MTkgNSw4LjYxNDcxODYxIDQsOS4yMzgwOTUyNCBMNC41MzU3MTQyOSw5LjkxMzQxOTkxIEM0LjkxMDcxNDI5LDkuNjcwOTk1NjcgNS4yNTg5Mjg1Nyw5LjQxMTI1NTQxIDUuNTg5Mjg1NzEsOS4xMzQxOTkxMyBMNS41ODkyODU3MSwxMiBMNi40MDE3ODU3MSwxMiBaIE05LjMzOTI4NTcxLDExLjk3NDAyNiBDOS44NjYwNzE0MywxMS45NzQwMjYgMTAuMTMzOTI4NiwxMS43MTQyODU3IDEwLjEzMzkyODYsMTEuMjAzNDYzMiBMMTAuMTMzOTI4NiwxMC4xMjk4NzAxIEwxMiwxMC4xMjk4NzAxIEwxMiw5LjM1MDY0OTM1IEwxMC4xMzM5Mjg2LDkuMzUwNjQ5MzUgTDEwLjEzMzkyODYsOS4xNTE1MTUxNSBDMTAuNjE2MDcxNCw4LjgwNTE5NDgxIDExLjA1MzU3MTQsOC40OTM1MDY0OSAxMS40Mjg1NzE0LDguMjA3NzkyMjEgTDExLjQyODU3MTQsNy42MTkwNDc2MiBMNy41MzU3MTQyOSw3LjYxOTA0NzYyIEw3LjUzNTcxNDI5LDguMzYzNjM2MzYgTDEwLjIxNDI4NTcsOC4zNjM2MzYzNiBDOS44MjE0Mjg1Nyw4LjU5NzQwMjYgOS41MDg5Mjg1Nyw4Ljc4Nzg3ODc5IDkuMjc2Nzg1NzEsOC45MzUwNjQ5NCBMOS4yNzY3ODU3MSw5LjM1MDY0OTM1IEw2LjkxMDcxNDI5LDkuMzUwNjQ5MzUgTDYuOTEwNzE0MjksMTAuMTI5ODcwMSBMOS4yNzY3ODU3MSwxMC4xMjk4NzAxIEw5LjI3Njc4NTcxLDEwLjk2OTY5NyBDOS4yNzY3ODU3MSwxMS4xNDI4NTcxIDkuMTc4NTcxNDMsMTEuMjI5NDM3MiA5LDExLjIyOTQzNzIgQzguNzU4OTI4NTcsMTEuMjI5NDM3MiA4LjQyODU3MTQzLDExLjIxMjEyMTIgOC4wMDg5Mjg1NywxMS4xNzc0ODkyIEw4LjI1ODkyODU3LDExLjk3NDAyNiBMOS4zMzkyODU3MSwxMS45NzQwMjYgWiIgaWQ9IuiNkCIgZmlsbD0iIzY2NjY2NiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
                alt=""
              />
              <div>0</div>
            </div>
            <div class="count-item">
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+R3JvdXAgODwvdGl0bGU+CiAgICA8ZyBpZD0iLSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuS6pOS6kuaAgSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM1My4wMDAwMDAsIC0xMDA3LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTLlpIfku70tNjkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgwLjAwMDAwMCwgODk0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMC4wMDAwMDAsIDI0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNDDlpIfku70tMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTgwLjAwMDAwMCwgODkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2My4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBmaWxsPSIjRDhEOEQ4IiBvcGFjaXR5PSIwIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wMDAwMDAsIDIuMDAwMDAwKSIgc3Ryb2tlPSIjNjY2NjY2IiBzdHJva2Utd2lkdGg9IjEuMzcxNDI4NTciPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik03LjkxMjA4NzkxLDAuNzUzNTMyMTgyIEMxMS42MzI1ODI4LDAuNzUzNTMyMTgyIDE0Ljc1MzMwMTQsMy4zMjE0Nzk0MyAxNS41OTg0OTMyLDYuNzgxNjIzMzEgQzE0Ljc1MzMwMTQsMTAuMjQyMDk5OCAxMS42MzI1ODI4LDEyLjgxMDA0NzEgNy45MTIwODc5MSwxMi44MTAwNDcxIEM0LjE5MTU5MzA1LDEyLjgxMDA0NzEgMS4wNzA4NzQ0MSwxMC4yNDIwOTk4IDAuMjI1NjgyNjEsNi43ODE5NTU5NyBDMS4wNzA4NzQ0MSwzLjMyMTQ3OTQzIDQuMTkxNTkzMDUsMC43NTM1MzIxODIgNy45MTIwODc5MSwwLjc1MzUzMjE4MiBaIiBpZD0iQ29tYmluZWQtU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iNy45MTIwODc5MSIgY3k9IjYuNzgxNzg5NjQiIHI9IjIuNzA1MTgwNTMiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
                alt=""
              />
              <div>{{ post.views }}</div>
            </div>
            <div class="count-item">
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+6K+E6K666YePPC90aXRsZT4KICAgIDxnIGlkPSLlsJ3or5UiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLop4TojIMt5pu05paw5qCH562+5Lul5Y+K5qCH562+SG92ZXLmgIEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNTMuMDAwMDAwLCAtNDg4NC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IuWPs+S4ieWbvuagh+ebkuWtkCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzUzLjAwMDAwMCwgNDg4NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLlm77moIciIGZpbGw9IiNEOEQ4RDgiIG9wYWNpdHk9IjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTExLjUwMDgwMzYsMi42IEMxMi4zNjk4Mjg2LDIuNiAxMi42ODQ5NTgxLDIuNjkwNDgzNTUgMTMuMDAyNjYwNywyLjg2MDM5Mjc0IEMxMy4zMjAzNjMyLDMuMDMwMzAxOTMgMTMuNTY5Njk4MSwzLjI3OTYzNjc2IDEzLjczOTYwNzMsMy41OTczMzkzMyBDMTMuOTA5NTE2NSwzLjkxNTA0MTg5IDE0LDQuMjMwMTcxMzcgMTQsNS4wOTkxOTY0IEwxNCw5LjcwMDgwMzYgQzE0LDEwLjU2OTgyODYgMTMuOTA5NTE2NSwxMC44ODQ5NTgxIDEzLjczOTYwNzMsMTEuMjAyNjYwNyBDMTMuNTY5Njk4MSwxMS41MjAzNjMyIDEzLjMyMDM2MzIsMTEuNzY5Njk4MSAxMy4wMDI2NjA3LDExLjkzOTYwNzMgQzEyLjY4NDk1ODEsMTIuMTA5NTE2NSAxMi4zNjk4Mjg2LDEyLjIgMTEuNTAwODAzNiwxMi4yIEw5LjI5OSwxMi4xOTkgTDUuNiwxNC42IEw1LjYsMTIuMTk5IEw0LjQ5OTE5NjQsMTIuMiBDMy42MzAxNzEzNywxMi4yIDMuMzE1MDQxODksMTIuMTA5NTE2NSAyLjk5NzMzOTMzLDExLjkzOTYwNzMgQzIuNjc5NjM2NzYsMTEuNzY5Njk4MSAyLjQzMDMwMTkzLDExLjUyMDM2MzIgMi4yNjAzOTI3NCwxMS4yMDI2NjA3IEMyLjA5MDQ4MzU1LDEwLjg4NDk1ODEgMiwxMC41Njk4Mjg2IDIsOS43MDA4MDM2IEwyLDUuMDk5MTk2NCBDMiw0LjIzMDE3MTM3IDIuMDkwNDgzNTUsMy45MTUwNDE4OSAyLjI2MDM5Mjc0LDMuNTk3MzM5MzMgQzIuNDMwMzAxOTMsMy4yNzk2MzY3NiAyLjY3OTYzNjc2LDMuMDMwMzAxOTMgMi45OTczMzkzMywyLjg2MDM5Mjc0IEMzLjMxNTA0MTg5LDIuNjkwNDgzNTUgMy42MzAxNzEzNywyLjYgNC40OTkxOTY0LDIuNiBMMTEuNTAwODAzNiwyLjYgWiIgaWQ9IuivhOiuuiIgc3Ryb2tlPSIjNjY2NjY2IiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
                alt=""
              />
              <div>{{ post.commentCount }}</div>
            </div>
            <div class="count-item">
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+54K56LWePC90aXRsZT4KICAgIDxnIGlkPSLlsJ3or5UiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLop4TojIMt5pu05paw5qCH562+5Lul5Y+K5qCH562+SG92ZXLmgIEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NzYuMDAwMDAwLCAtNDg4NC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IueCuei1niIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDc2LjAwMDAwMCwgNDg4NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIGZpbGw9IiNEOEQ4RDgiIG9wYWNpdHk9IjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTExLjQ4MjA1MSwxNC42ODI4NTUzIEM4Ljg5MjM4MDc3LDE0LjY4Mjg1NTMgMi45OTE2OTY5OSwxNC42ODI4NTUzIDIuOTkxNjk2OTksMTQuNjgyODU1MyBDMi40NDM5OTc4NywxNC42ODI4NTUzIDIsMTQuMjMzOTY1MSAyLDEzLjY5NDk0OTkgTDIsNy43NDM5NzYxMiBDMiw3LjE5ODM3MTA0IDIuNDQyNzkzNTQsNi43NTUxMzg5MSAyLjk4Mzc0MzQyLDYuNzU0MzY3MTQgQzIuOTgzNzQzNDIsNi43NTQzNjcxNCAzLjY3OTY1MzUxLDYuNzUxOTI2MTIgMy43MTg4MDYzMSw2Ljc1NjA3MDczIEM0LjUzODA1MjM4LDYuNzU2MDcwNzMgNC45ODczOTQzNyw2LjI3MTk4MTg3IDUuMjk4NTYwOTcsNS44NDM4NjEyMiBDNS45MDI3MzcxNiw1LjAxMjYwMTMzIDYuMTExMTk2OTksNC4zMTA0NjUxNCA2LjI0NDUzMzIxLDMuOTMyMzE3MiBDNi41NTE3NTA0OSwzLjA2MTAzNDE3IDYuNTIzNjIwOTcsMi4yNjcwNzIxNSA3LjI0MDQ2MTI4LDIuMDQ5MjUxNCBDNy45NTczMDE2LDEuODMxNDMwNjQgOS40OTMzODc5OCwyLjI2NzA3MjE1IDguOTkwNTA1NTUsNC43NjE2NzI5NyBDOC45NDA4NTQwNyw1LjAwNzk3NDMzIDguNzQ2NDA5NDcsNS45Mzc3NzE2IDguNjYwMzc0NDUsNi4zMDMxMTE2MiBDOC42NjAzNzQ0NSw2LjMwMzExMTYyIDEwLjYwMDI0NDUsNi4zMDMxMTE2MiAxMi4zMjMxOTk0LDYuMzAzMTExNjIgQzEyLjc2MDUwMTksNi4zMDMxMTE2MiAxMy4wNDE0NTEsNi40MzU3Mzg2NSAxMy4yMjcxMTc4LDYuNjI1NDI1MzkgQzE0LjUxNjczMTQsNy45NDI5NjA5MiAxMy40OTczOTU0LDE0LjI3OTQ0NDkgMTEuNDgyMDUxLDE0LjY4Mjg1NTMgWiBNNC41NDc3MjcyNyw2LjY1MDM4MDI3IEw0LjUxNjg4OTU2LDE0LjY3NDU5ODYiIGlkPSLngrnotZ4oYm9yZGVyczpHQzM4KSIgc3Ryb2tlPSIjNjY2NjY2IiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
                alt=""
              />
              <div>{{ post.likes }}</div>
            </div>
            <div class="count-item">
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5pS26JeP6YePPC90aXRsZT4KICAgIDxnIGlkPSLlsJ3or5UiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLop4TojIMt5pu05paw5qCH562+5Lul5Y+K5qCH562+SG92ZXLmgIEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01OTEuMDAwMDAwLCAtNDg4NC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IuWPs+S6jOWbvuagh+ebkuWtkCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTkxLjAwMDAwMCwgNDg4NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLlm77moIciIGZpbGw9IiNEOEQ4RDgiIG9wYWNpdHk9IjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTYuNTEyMzU3NzksMi4yMDY4MjYzOCBMNS40MTk2NjI1OCw0LjQ0NDM1NzQ0IEM1LjMyMjUxMjU5LDQuNjQzMjkzMTcgNS4xMzI5NDI2Nyw0Ljc4MTAyMzc4IDQuOTEzNzIyNTQsNC44MTE5NDQzOSBMMi40NDgwNDI2Niw1LjE1OTcyNDE2IEMyLjA4MjgyODgyLDUuMjExMjM2OTMgMS43NDUyNzQ0Myw1LjM4MzIyOTQ4IDEuNDg4OTMyNDMsNS42NDg0MTUyNCBDMC44NTM0NTI2NjUsNi4zMDU4MTg5MyAwLjg3MTIyNTUyMSw3LjM1MzkwODA0IDEuNTI4NjI5MjEsNy45ODkzODc4IEwzLjMxODk4NjMyLDkuNzIwMDM3ODIgQzMuNDc4MTY0NDUsOS44NzM5MDc0OCAzLjU1MDU3MzcxLDEwLjA5Njc2MDMgMy41MTIyMzgyMiwxMC4zMTQ4MDYgTDMuMDgxMDU5NDUsMTIuNzY3Mjc2OCBDMy4wMTcxOTM3MSwxMy4xMzA1MzQxIDMuMDc2NDU4MzEsMTMuNTA0NzE2IDMuMjQ5NDUwOTIsMTMuODMwNDU4NyBDMy42NzgzMDQ5MywxNC42Mzc5ODQ4IDQuNjgwNTg5MDMsMTQuOTQ0OTU5MSA1LjQ4ODExNTExLDE0LjUxNjEwNTEgTDcuNjg3MzExODYsMTMuMzQ4MTc0NiBDNy44ODI4MzkzNCwxMy4yNDQzMzU1IDguMTE3MTYwNjYsMTMuMjQ0MzM1NSA4LjMxMjY4ODE0LDEzLjM0ODE3NDYgTDEwLjUxMTg4NDksMTQuNTE2MTA1MSBDMTAuODM3NjI3NSwxNC42ODkwOTc3IDExLjIxMTgwOTUsMTQuNzQ4MzYyMyAxMS41NzUwNjY4LDE0LjY4NDQ5NjYgQzEyLjQ3NTU5MjksMTQuNTI2MTcxNCAxMy4wNzcyNjU3LDEzLjY2NzgwMjkgMTIuOTE4OTQwNiwxMi43NjcyNzY4IEwxMi40ODc3NjE4LDEwLjMxNDgwNiBDMTIuNDQ5NDI2MywxMC4wOTY3NjAzIDEyLjUyMTgzNTYsOS44NzM5MDc0OCAxMi42ODEwMTM3LDkuNzIwMDM3ODIgTDE0LjQ3MTM3MDgsNy45ODkzODc4IEMxNC43MzY1NTY1LDcuNzMzMDQ1OCAxNC45MDg1NDkxLDcuMzk1NDkxNDEgMTQuOTYwMDYxOSw3LjAzMDI3NzU3IEMxNS4wODc3NjM2LDYuMTI0OTAxMTggMTQuNDU3MzMzNyw1LjI4NzQyNTkgMTMuNTUxOTU3Myw1LjE1OTcyNDE2IEwxMS4wODYyNzc1LDQuODExOTQ0MzkgQzEwLjg2NzA1NzMsNC43ODEwMjM3OCAxMC42Nzc0ODc0LDQuNjQzMjkzMTcgMTAuNTgwMzM3NCw0LjQ0NDM1NzQ0IEw5LjQ4NzY0MjIxLDIuMjA2ODI2MzggQzkuMzI1NzkzMzgsMS44NzU0MDU3IDkuMDU3OTA4NywxLjYwNzUyMTAyIDguNzI2NDg4MDIsMS40NDU2NzIxOCBDNy45MDQ4ODU5MSwxLjA0NDQ0MzkzIDYuOTEzNTg2MDQsMS4zODUyMjQyNyA2LjUxMjM1Nzc5LDIuMjA2ODI2MzggWiBNOC4xOTk5MDYxLDIuNTIzOTYzMTggQzguMjkxMTAyMzksMi41Njg0OTg3NyA4LjM2NDgxNTYzLDIuNjQyMjEyIDguNDA5MzUxMjEsMi43MzM0MDgzIEw5LjUwMjA0NjQyLDQuOTcwOTM5MzYgQzkuNzc0MDY2MzksNS41Mjc5NTk0MiAxMC4zMDQ4NjIyLDUuOTEzNjA1MTMgMTAuOTE4Njc4NSw2LjAwMDE4Mjg0IEwxMy4zODQzNTg0LDYuMzQ3OTYyNjEgQzEzLjYzMzQ4ODgsNi4zODMxMDIwMSAxMy44MDY5NjI4LDYuNjEzNTQ4MjMgMTMuNzcxODIzNCw2Ljg2MjY3ODY1IEMxMy43NTc2NDg4LDYuOTYzMTczNzMgMTMuNzEwMzIyLDcuMDU2MDU3ODIgMTMuNjM3MzUxNCw3LjEyNjU5NDg4IEwxMS44NDY5OTQzLDguODU3MjQ0OSBDMTEuNDAxMjk1NSw5LjI4ODA3OTk0IDExLjE5ODU0OTYsOS45MTIwNjc4MSAxMS4zMDU4ODksMTAuNTIyNTk1OCBMMTEuNzM3MDY3NywxMi45NzUwNjY2IEMxMS43ODA2MzM3LDEzLjIyMjg2MjQgMTEuNjE1MDcyNywxMy40NTkwNTc4IDExLjM2NzI3NywxMy41MDI2MjM3IEMxMS4yNjczMjAyLDEzLjUyMDE5NzUgMTEuMTY0MzU3NCwxMy41MDM4ODk4IDExLjA3NDcyMzUsMTMuNDU2Mjg3OCBMOC44NzU1MjY4LDEyLjI4ODM1NzMgQzguMzI4MDQ5ODQsMTEuOTk3NjA3OSA3LjY3MTk1MDE2LDExLjk5NzYwNzkgNy4xMjQ0NzMyLDEyLjI4ODM1NzMgTDQuOTI1Mjc2NDUsMTMuNDU2Mjg3OCBDNC43MDMwNzEyOSwxMy41NzQyOTQ2IDQuNDI3Mjc1LDEzLjQ4OTgyNTIgNC4zMDkyNjgxOSwxMy4yNjc2MiBDNC4yNjE2NjYxOSwxMy4xNzc5ODYxIDQuMjQ1MzU4NDksMTMuMDc1MDIzMyA0LjI2MjkzMjI4LDEyLjk3NTA2NjYgTDQuNjk0MTExMDUsMTAuNTIyNTk1OCBDNC44MDE0NTA0NCw5LjkxMjA2NzgxIDQuNTk4NzA0NDksOS4yODgwNzk5NCA0LjE1MzAwNTczLDguODU3MjQ0OSBMMi4zNjI2NDg2Miw3LjEyNjU5NDg4IEMyLjE4MTc1MjMsNi45NTE3MzEzMyAyLjE3Njg2MTc5LDYuNjYzMzMwOTYgMi4zNTE3MjUzNCw2LjQ4MjQzNDY1IEMyLjQyMjI2MjQxLDYuNDA5NDY0MDcgMi41MTUxNDY1LDYuMzYyMTM3MjYgMi42MTU2NDE1OCw2LjM0Nzk2MjYxIEw1LjA4MTMyMTQ3LDYuMDAwMTgyODQgQzUuNjk1MTM3ODIsNS45MTM2MDUxMyA2LjIyNTkzMzYxLDUuNTI3OTU5NDIgNi40OTc5NTM1OCw0Ljk3MDkzOTM2IEw3LjU5MDY0ODc5LDIuNzMzNDA4MyBDNy42ODg3ODY2NCwyLjUzMjQ0OTY5IDcuOTE1MjE1ODIsMi40MzYwMjk2OCA4LjEyMzEwMzk1LDIuNDk0NjI1MDEgTDguMTk5OTA2MSwyLjUyMzk2MzE4IFoiIGlkPSLmlLbol48iIGZpbGw9IiM2NjY2NjYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
                alt=""
              />
              <div>{{ post.favorites }}</div>
            </div>
            <div class="count-item">
              <img
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5YiG5Lqr6YePPC90aXRsZT4KICAgIDxnIGlkPSLlsJ3or5UiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLop4TojIMt5pu05paw5qCH562+5Lul5Y+K5qCH562+SG92ZXLmgIEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MTEuMDAwMDAwLCAtNDg4NC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IuWPs+S4gOWbvuagh+ebkuWtkCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzExLjAwMDAwMCwgNDg4NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLlm77moIciIGZpbGw9IiNEOEQ4RDgiIG9wYWNpdHk9IjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgPGcgaWQ9IuKeoe+4j+abtOaNouWbvuaghyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wMDAwMDAsIDIuMDAwMDAwKSIgZmlsbD0iIzY2NjY2NiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNy41ODQ4MDQ5NSwtMC40NjI0NDgyMDcgQzYuOTcwMTA3MDEsLTAuNDAwMDIyMjMyIDYuNDkwNDIzMjEsMC4xMTkxMDk1NjYgNi40OTA0MjMyMSwwLjc1MDI3NzUxOSBMNi40ODksMy4wMTcgTDYuNDY5NTUyMDMsMy4wMjE3OTM5NiBDMi41NDg5MTU0NCwzLjg3MTA1ODc3IC0wLjM2NTc2NjI2Myw3LjI1OTcwNzE1IC0wLjUyMDA0NzQxNywxMS4zMDQ1MjY3IEMtMC41Mzk1MDAzODQsMTEuODE0NTI5IDAuMDQ2MjA3NDAwOSwxMi4xMTQzOTczIDAuNDQ4NTk3MDY1LDExLjgwMDQ0OTMgTDAuNzcyMjU5MTA4LDExLjU1NjAxMzYgQzIuNDA4MzA5OTUsMTAuMzYwMzg0IDQuMzA3Mzg3NzYsOS41NjQ2Mjk2NSA2LjMzMDc4MzA1LDkuMjQyNjExNzMgTDYuNDg5LDkuMjE5IEw2LjQ5MDQyMzIyLDExLjE0ODUzMTYgQzYuNDkwNDIzMjEsMTEuNDM4Mjc2OCA2LjU5MzcxMTA2LDExLjcxODY1MyA2Ljc4MTc1NTY0LDExLjkzOTI0MDkgQzcuMjE4NTE2NTcsMTIuNDUxNTg4MiA3Ljk4NzkyMDg3LDEyLjUxMjg2MzEgOC41MDAyNjgyMywxMi4wNzYxMDIyIEwxNC4wNDY0ODg2LDcuMzQ4MTEzNzkgQzE0LjEyMDYzNTksNy4yODQ5MDU0MiAxNC4xODk2Mzk5LDcuMjE1OTAxNDIgMTQuMjUyODQ4Miw3LjE0MTc1NDEyIEMxNC45MTEzOTY5LDYuMzY5MjM2MjEgMTQuODE5MDA2NSw1LjIwOTEyNzU3IDE0LjA0NjQ4ODYsNC41NTA1Nzg5NiBMOC41MDAyNjgyMywtMC4xNzc0MDk0NCBDOC4yNzk2ODA0LC0wLjM2NTQ1NDAyIDcuOTk5MzA0MjEsLTAuNDY4NzQxODY3IDcuNzA5NDQyNiwtMC40Njg3NDE4NjcgTDcuNTg0ODA0OTUsLTAuNDYyNDQ4MjA3IFogTTcuNzA5NDQyNiwwLjczMTI1ODEzMyBMNy43MjE3ODEyMiwwLjczNTgwMzU2IEwxMy4yNjgwMDE2LDUuNDYzNzkxOTYgQzEzLjUzNjE2NTksNS42OTIzOTQwNyAxMy41NjgyMzc0LDYuMDk1MTAyODIgMTMuMzM5NjM1Miw2LjM2MzI2NzEyIEMxMy4zMTc2OTM3LDYuMzg5MDA1ODggMTMuMjkzNzQwMyw2LjQxMjk1OTI2IDEzLjI2ODAwMTYsNi40MzQ5MDA3OSBMNy43MjE3ODEyMiwxMS4xNjI4ODkyIEM3LjcxMzc4NzQ3LDExLjE2OTcwMzYgNy43MDE3ODMwNywxMS4xNjg3NDc2IDcuNjk0OTY4NjQsMTEuMTYwNzUzOSBMNy42OTA0MjMyMSwxMS4xNDg0MTUyIEw3LjY4OTkxNzg5LDguNTQxNzk3NzMgQzcuNjg5ODQ5MzIsOC4xODgxNDM4NyA3LjM4NTQ3NDE2LDcuOTExMjY1NTMgNy4wMzMzOTMxNSw3Ljk0NDU4MjUzIEw2LjYwOTM5MTE5LDcuOTkxMTQ4MzcgQzQuNjM3NDgzMTQsOC4yMzc4MDQ0MyAyLjc2MjgzOTkxLDguODk0MDA4MiAxLjA5MTE0Nzc5LDkuOTAzNjY3NjUgTDAuODQsMTAuMDYgTDAuODg0NzA4MzgzLDkuODY0NjEyMTcgQzEuNjAwNzQwNzgsNi45MDUxMjY3NyA0LjA2NjMyOTQ3LDQuNTkxNTk1MDggNy4xODE1NjkyMSw0LjEwOTY2NTUxIEM3LjQ3Mzk5NTYyLDQuMDY0NDI2OTYgNy42ODk3Nzc1OSwzLjgxMjc1MDI2IDcuNjg5ODM5OTcsMy41MTY4NDUzNCBMNy42OTA0MjMyLDAuNzUwNDA0MDEyIEM3LjY5MDQyMzIxLDAuNzM5NzczNDAyIDcuNjk4OTM4NDgsMC43MzEyNTgxMzMgNy43MDk0NDI2LDAuNzMxMjU4MTMzIFoiIGlkPSLlvaLnirbnu5PlkIgiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                alt=""
              />
              <div>0</div>
            </div>
          </span>
        </div>
        <div class="data2action_actions fr">
          <div class="drawer-button data2action_actions_heatContent">
            <span class="article-action-btn" data-urlkey="内容管理-内容加热-按钮PV/UV">查看</span>
          </div>
          <span class="drawer-button"><span>查看评论</span></span>
          <span class="drawer-button" @click="edit()">
            <span data-urlkey="内容管理-详细数据点击" class="article-action-btn">编辑</span>
          </span>
          <span class="drawer-button" @click="deleteRow">
            <span data-urlkey="内容管理-详细数据点击" class="article-action-btn">删除</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="PostItem">
import { Post } from '@/api/modules'
import { useRouter } from 'vue-router'

const props = defineProps<{
  post: Post.Item
}>()

const router = useRouter()
const emit = defineEmits<{
  (event: 'deleteRow', row: Post.Item): void
}>()
const edit = () => {
  router.push({
    path: '/posts/edit',
    query: {
      id: props.post.id
    }
  })
}

const deleteRow = () => {
  emit('deleteRow', props.post)
}
</script>

<style lang="scss" scoped>
.article-item {
  border-bottom: 1px solid #e9ecf3;
  display: flex;
  padding-bottom: 30px;
  padding-top: 30px;
  .cover-image {
    align-items: center;
    border-radius: 5px;
    display: flex;
    height: 106px;
    justify-content: center;
    margin-right: 20px;
    overflow: hidden;
    position: relative;
    width: 160px;
  }
  .article-info {
    flex: 1;
  }
  .article-title {
    display: flex;
    flex: 1;
    justify-content: space-between;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      height: 18px;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 592px;
    }
    .time {
      align-items: center;
      color: #999;
      display: flex;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      height: 16px;
      justify-content: flex-end;
      line-height: 16px;
      text-align: right;
      width: 154px;
    }
  }
  .article-tags {
    margin-top: 12px;
    display: inline-block;

    &::before,
    &::after {
      content: ' ';
      display: table;
    }
    &::after {
      clear: both;
    }

    .line-wrap {
      float: left;
      white-space: nowrap;
    }
  }
  .create-tag {
    border-radius: 20px;
    cursor: default;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    line-height: 12px;
    margin-right: 6px;
    padding: 4px 8px;
    text-align: center;
  }
  .create-hover-tag {
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMuMTc5IDIuMDcyYS42MzIuNjMyIDAgMCAxIC44MzYtLjk0M2wuMDcuMDYyIDMuMzY4IDMuNDY3YS42MzIuNjMyIDAgMCAxIC4wNS44MjNsLS4wNjMuMDctMy4zNjggMy4yN2EuNjMyLjYzMiAwIDAgMS0uOTQzLS44MzZsLjA2My0uMDcgMi45MTUtMi44My0yLjkyOC0zLjAxM1oiIGZpbGw9IiM0RTVCNzYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==)
      no-repeat right 6px center;
    border-radius: 20px;
    cursor: default;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    line-height: 12px;
    margin-right: 6px;
    padding: 4px 16px 4px 8px;
    text-align: center;
  }
  .data2action {
    margin-top: 12px;
    &::before,
    &::after {
      content: ' ';
      display: table;
    }
    &::after {
      clear: both;
    }
  }
  .data2action_commonData {
    &::before,
    &::after {
      content: ' ';
      display: table;
    }
    &::after {
      clear: both;
    }
    .wrap {
      color: #666;
      font-family: PingFangSC-Regular, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, SimSun, Arial,
        sans-serif;
      line-height: 14px;
      .count-item {
        display: flex;
        float: left;
        line-height: 14px;
        margin-right: 18px;
        .img {
          height: 16px;
          margin-right: 6px;
          width: 16px;
        }
        div {
          color: #666;
          font-family: PingFangSC-Regular, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, SimSun, Arial,
            sans-serif;
          font-size: 14px;
          line-height: 16px;
        }
      }
    }
    .data2action_actions {
      display: flex;
      justify-content: flex-end;
      line-height: 14px;
      width: 350px;
    }
  }
  .drawer-button,
  .article-action-btn {
    color: #3855d5;
    cursor: pointer;
    font-family: PingFangSC-Regular, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, SimSun, Arial,
      sans-serif;
    line-height: 14px;
  }
  .data2action_actions_heatContent {
    display: inline-block;
    position: relative;
  }
  .drawer-button {
    margin-left: 14px;
  }
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>
